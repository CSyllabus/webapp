from rest_framework.parsers import JSONParser, FileUploadParser
from rest_framework.views import APIView
from ..models import Course
from ..models import Program
from ..models import ProgramFaculty
from ..models import Faculty
from ..models import University
from ..models import City
from ..models import Country
from ..models import CourseResult
from ..models import CourseProgram
from ..models import CourseFaculty
from ..models import CourseUniversity
from ..models import ProgramCity
from ..models import ProgramCountry
from ..models import ProgramUniversity

from ..models import AdminUniversity
from ..models import AdminFaculty

from django.http import HttpResponse

from ..models import UserCoursePost

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.decorators import parser_classes
from datetime import datetime
from jwt_auth import utils
from jwt_auth.compat import json, User, smart_text

from gensim import corpora, models, similarities
from collections import defaultdict
from nltk.corpus import stopwords

import ast

try:
    from django.utils import simplejson as json
except ImportError:
    import json


@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
class CourseView(APIView):
    def get(self, request, course_id=-1, limit=-1, offset=-1):
        query_pairs = request.META['QUERY_STRING'].split('&')

        for query_pair in query_pairs:
            query_pair_split = query_pair.split('=')
            if query_pair_split[0] == 'limit':
                limit = int(query_pair_split[1])
            elif query_pair_split[0] == 'offset':
                offset = int(query_pair_split[1])

        if course_id >= 0:
            try:
                course_id = int(course_id)
                courses = Course.objects.filter(id=course_id)
            except:
                courses = []

        else:
            courses = Course.objects.all().order_by('name')

        data = {}
        result = {}
        courses_list = []
        for course in courses:

            try:
                course.keywords = ast.literal_eval(course.keywords)
            except:
                pass

            course_data = {'id': course.id, 'name': course.name, 'description': course.description, 'ects': course.ects,
                           'englishLevel': course.english_level, 'semester': course.semester,
                           'keywords': course.keywords, 'level': course.english_level, 'url': course.url,
                           'modified': course.modified, 'created': course.created}

            try:
                course_faculty = CourseFaculty.objects.filter(course_id=course.id).select_related('faculty')[0]
                course_data['faculty'] = course_faculty.faculty.name
            except IndexError:
                pass

            try:
                course_university = \
                    CourseUniversity.objects.filter(course_id=course.id).select_related('university__country')[0]
                university = course_university.university
                course_data['university'] = university.name
                course_data['universityId']=university.id
                course_data['country'] = university.country.name
                course_data['universityImg'] = university.img
            except IndexError:
                pass

            courses_list.append(course_data)

        if limit > 0 and offset >= 0:
            data['currentItemCount'] = limit
            data['items'] = courses_list[offset:offset + limit]
        elif limit > 0:
            data['currentItemCount'] = limit
            data['items'] = courses_list[0:limit]
        elif offset >= 0:
            count = len(courses_list)
            data['currentItemCount'] = count
            data['items'] = courses_list[offset:count]
        else:
            data['currentItemCount'] = len(courses_list)
            data['items'] = courses_list

        result['data'] = data
        return Response(result)

    def post(self, request, format=json):

        data = {}
        result = {}

        try:
            decoded_payload = utils.jwt_decode_handler(
                request.META.get('HTTP_AUTHORIZATION').strip().split("JWT ")[1])
            user = User.objects.filter(id=decoded_payload['user_id'])[0]

            allow_access = False

            faculty_id = 0
            university_id = 0

            try:
                faculty_id = request.data['faculty']
            except:
                pass

            try:
                university_id = request.data['university']
            except:
                pass

            if (faculty_id > 0):
                try:
                    adminfaculty = AdminFaculty.objects.filter(user_id=user.id)[0]

                    if (adminfaculty.faculty_id == faculty_id):
                        allow_access = True
                except:
                    pass

            if (university_id > 0):
                try:
                    adminuniversity = AdminUniversity.objects.filter(user_id=user.id)[0]

                    if (adminuniversity.university_id == university_id):
                        allow_access = True

                except:
                    pass

            if (user.is_admin or allow_access):

                course = Course.objects.create()

                try:
                    course.name = request.data['name']
                except:
                    pass
                try:
                    course.description = request.data['description']
                except:
                    pass
                try:
                    course.level = request.data['level']
                except:
                    pass
                try:
                    course.english_level = request.data['englishLevel']
                except:
                    pass
                try:
                    course.semester = request.data['semester']
                except:
                    pass
                try:
                    course.url = request.data['url']
                except:
                    pass
                try:
                    course.ects = request.data['ects']
                except:
                    pass
                try:
                    course.keywords = request.data['keywords']
                except:
                    pass

                course.save()

                course_data = {'id': course.id, 'name': course.name, 'description': course.description,
                               'ects': course.ects,
                               'englishLevel': course.english_level, 'semester': course.semester,
                               'keywords': course.keywords,
                               'modified': course.modified, 'created': course.created}

                if (faculty_id > 0):
                    faculty = Faculty.objects.filter(id=faculty_id)
                    CourseFaculty.objects.create(faculty=faculty[0], course=course)
                    course_data['faculty'] = faculty[0].name

                elif (university_id > 0):
                    university = University.objects.filter(id=university_id)
                    CourseUniversity.objects.create(university=university[0], course=course)
                    course_data['university'] = university[0].name

                courses_list = []
                courses_list.append(course_data)

                data['currentItemCount'] = len(courses_list)
                data['items'] = courses_list

                result['data'] = data

                return Response(result)

            else:
                result['data'] = []
                return HttpResponse('Unauthorized', status=401)
        except:

            result['data'] = []
            return Response(result)

    def delete(selfself, request, course_id):
        Course.objects.filter(id=course_id).delete()
        CourseResult.objects.filter(first_course_id=course_id).delete()
        CourseResult.objects.filter(second_course_id=course_id).delete()

        courses = Course.objects.all().order_by('id')
        documents = []
        documents_names = []
        document_courses = []
        stoplist = stopwords.words('english')
        stoplist = stoplist + ['is', 'how', 'or', 'to', 'of', 'the',
                               'in', 'for', 'on', 'will', 'a', 'advanced', 'an', 'and', 'are', 'as', 'be', 'by',
                               'course',
                               'with', 'some', 'student', 'students', 'systems', 'system', 'basic',
                               'this', 'knowledge', 'use', 'using', 'well', 'hours;', 'four']

        # parametar 1: remove keywords from names
        stoplist_names = stopwords.words('english')

        for course in courses:
            documents.append(course.description + course.name)
            documents_names.append(course.name)
            document_courses.append(course)

        texts = [[word.replace(".", "").lower() for word in document.split()
                  if word.replace(".", "").lower() not in stoplist]
                 for document in documents]

        frequency = defaultdict(int)
        for text in texts:
            for token in text:
                frequency[token] += 1
        texts = [[token for token in text if frequency[token] > 1]
                 for text in texts]

        dictionary = corpora.Dictionary(texts)
        dictionary.filter_n_most_frequent(15)
        dictionary.save_as_text("dictionary.txt", sort_by_word=False)
        corpus = [dictionary.doc2bow(text) for text in texts]
        corpora.MmCorpus.serialize('corpus.mm', corpus)
        lsi = models.LsiModel(corpus, id2word=dictionary, num_topics=125)
        lsi.save("lsi.model")

        return Response()

    def put(selfself, request, course_id):
        try:
            course = Course.objects.filter(id=course_id)[0]
            try:
                course.name = request.data['name']
            except:
                pass

            try:
                course.description = request.data['description']
            except:
                pass

            try:
                course.level = request.data['level']
            except:
                pass

            try:
                course.url = request.data['url']
            except:
                pass

            try:
                course.english_level = request.data['englishLevel']
            except:
                pass

            try:
                course.semester = request.data['semester']
            except:
                pass

            try:
                course.ects = request.data['ects']
            except:
                pass



            try:
                course.keywords = request.data['keywords']
            except:
                pass

            #print faculty_id
            #print university_id

            course.save()
        except IndexError:
            pass



        return Response()


@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
class CourseByProgramView(APIView):
    def get(self, request, program_id):

        course_programs = CourseProgram.objects.filter(program_id=program_id)

        course_ids = []
        for i in course_programs:
            course_ids.append(i.course_id)

        data = {}
        result = {}
        courses_list = []
        for course_id in course_ids:
            course = Course.objects.filter(id=course_id)[0]
            one_course = {'id': course.id, 'name': course.name, 'description': course.description, 'ects': course.ects,
                          'englishLevel': course.english_level, 'semester': course.semester,
                          'keywords': course.keywords,
                          'modified': course.modified, 'created': course.created}
            courses_list.append(one_course)

        courses_list.sort(key=lambda x: x['name'], reverse=False)
        data['currentItemCount'] = len(course_ids)
        data['items'] = courses_list
        result['data'] = data
        return Response(result)


@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
class CourseByFacultyView(APIView):
    def get(self, request, faculty_id, limit=-1, offset=-1):
        query_pairs = request.META['QUERY_STRING'].split('&')

        for query_pair in query_pairs:
            query_pair_split = query_pair.split('=')
            if query_pair_split[0] == 'limit':
                limit = int(query_pair_split[1])
            elif query_pair_split[0] == 'offset':
                offset = int(query_pair_split[1])

        course_faculties = CourseFaculty.objects.filter(faculty_id=faculty_id).select_related(
            'course').prefetch_related('faculty__university__country')
        data = {}
        result = {}

        try:
            faculty = course_faculties[0].faculty
            university = faculty.university
            country = university.country

            courses_list = []
            for course_faculty in course_faculties:
                try:
                    course = course_faculty.course

                    if len(course.description) <= 203:
                        short_description = course.description
                    else:
                        short_description = course.description[0:200] + '...'

                    course_data = {'id': course.id, 'name': course.name, 'description': course.description,
                                   'ects': course.ects, 'englishLevel': course.english_level,
                                   'semester': course.semester,
                                   'modified': course.modified, 'created': course.created, 'faculty': faculty.name,
                                   'university': university.name, 'country': country.name,
                                   'short_description': short_description}

                    courses_list.append(course_data)
                except IndexError:
                    print "Course found in course_faculty " + course_faculties.id + " missing from database."

            courses_list.sort(key=lambda x: x['name'], reverse=False)

            if limit > 0 and offset >= 0:
                data['currentItemCount'] = limit
                data['items'] = courses_list[offset:offset + limit]
            elif limit > 0:
                data['currentItemCount'] = limit
                data['items'] = courses_list[0:limit]
            elif offset >= 0:
                count = len(courses_list)
                data['currentItemCount'] = count
                data['items'] = courses_list[offset:count]
            else:
                data['currentItemCount'] = len(courses_list)
                data['items'] = courses_list

        except IndexError:
            data['currentItemCount'] = 0
            data['items'] = []

        result['data'] = data
        return Response(result)


@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
class CourseByUniversityView(APIView):
    def get(self, request, university_id, limit=-1, offset=-1):
        query_pairs = request.META['QUERY_STRING'].split('&')

        for query_pair in query_pairs:
            query_pair_split = query_pair.split('=')
            if query_pair_split[0] == 'limit':
                limit = int(query_pair_split[1])
            elif query_pair_split[0] == 'offset':
                offset = int(query_pair_split[1])

        course_universities = CourseUniversity.objects.filter(university_id=university_id).select_related(
            'course').prefetch_related('university__country')
        data = {}
        result = {}

        try:
            university = course_universities[0].university
            country = university.country

            courses_list = []
            for course_university in course_universities:
                try:
                    course = course_university.course

                    if len(course.description) <= 203:
                        short_description = course.description
                    else:
                        short_description = course.description[0:200] + '...'

                    course_data = {'id': course.id, 'name': course.name, 'description': course.description,
                                   'ects': course.ects, 'englishLevel': course.english_level,
                                   'semester': course.semester,
                                   'modified': course.modified, 'created': course.created,
                                   'university': university.name, 'country': country.name,
                                   'short_description': short_description}

                    courses_list.append(course_data)
                except IndexError:
                    print "Course found in course_university " + course_university.id + " missing from database."

            courses_list.sort(key=lambda x: x['name'], reverse=False)

            if limit > 0 and offset >= 0:
                data['currentItemCount'] = limit
                data['items'] = courses_list[offset:offset + limit]
            elif limit > 0:
                data['currentItemCount'] = limit
                data['items'] = courses_list[0:limit]
            elif offset >= 0:
                count = len(courses_list)
                data['currentItemCount'] = count
                data['items'] = courses_list[offset:count]
            else:
                data['currentItemCount'] = len(courses_list)
                data['items'] = courses_list

        except IndexError:
            data['currentItemCount'] = 0
            data['items'] = []

        result['data'] = data
        return Response(result)


@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
class CoursesAllSimpleView(APIView):
    def get(self, request, course_id=-1, limit=-1, offset=-1):

        query_pairs = request.META['QUERY_STRING'].split('&')

        for query_pair in query_pairs:
            query_pair_split = query_pair.split('=')
            if query_pair_split[0] == 'limit':
                limit = int(query_pair_split[1])
            elif query_pair_split[0] == 'offset':
                offset = int(query_pair_split[1])

        courses = Course.objects.all().order_by('name')

        data = {}
        result = {}
        courses_list = []
        for course in courses:
            course_data = {'id': course.id, 'name': course.name, 'description': course.description,
                           'ects': course.ects, 'englishLevel': course.english_level,
                           'semester': course.semester,
                           'modified': course.modified, 'created': course.created

                           }

            courses_list.append(course_data)

        courses_list.sort(key=lambda x: x['name'], reverse=False)

        if limit > 0 and offset >= 0:
            data['currentItemCount'] = limit
            data['items'] = courses_list[offset:offset + limit]
        elif limit > 0:
            data['currentItemCount'] = limit
            data['items'] = courses_list[0:limit]
        elif offset >= 0:
            count = len(courses_list)
            data['currentItemCount'] = count
            data['items'] = courses_list[offset:count]
        else:
            data['currentItemCount'] = len(courses_list)
            data['items'] = courses_list


@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
class CommentsByCourseView(APIView):
    def get(self, request, course_id):
        try:
            course_id = int(course_id)
            user_course_posts = UserCoursePost.objects.filter(course_id=course_id)
        except:
            user_course_posts = []

        data = {}
        result = {}

        try:

            comments_list = []

            for comment in user_course_posts:
                try:

                    comment_data = {'id': comment.id, 'author': comment.author, 'content': comment.content,
                                    'show': comment.show, 'modified': comment.modified}

                    comments_list.append(comment_data)

                    data['currentItemCount'] = len(comments_list)
                    data['items'] = comments_list


                except:
                    pass

        except IndexError:
            data['currentItemCount'] = 0
            data['items'] = []

        result['data'] = data
        return Response(result)

    def post(self, request, course_id, format=json):

        author = request.data['author']
        content = request.data['content']

        course = Course.objects.filter(id=course_id)[0]
        try:
            show = request.data['show']
        except:
            show = 1

        user_course_posts = UserCoursePost.objects.create(course=course, author=author, content=content, show=show)
        # course = Course.objects.create(name=name)
        # print course_id, author, content

        return Response()
