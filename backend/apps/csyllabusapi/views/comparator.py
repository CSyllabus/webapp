from django.utils.datastructures import MultiValueDictKeyError
from rest_framework.parsers import JSONParser
from ..models import Course
from ..models import CourseResult
from ..models import CourseUniversity
from ..models import CourseFaculty

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.decorators import parser_classes

try:
    from django.utils import simplejson as json
except ImportError:
    import json

from gensim import corpora, models, similarities

dictionary = corpora.Dictionary.load_from_text("dictionary.txt")
lsi = models.LsiModel.load("lsi.model")
corpus = corpora.MmCorpus('corpus.mm')


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
def comparator(request):
    try:
        country_id = request.query_params['country_id']
    except:
        country_id = None
    try:
        faculty_id = request.query_params['faculty_id']
    except:
        faculty_id = None
    try:
        university_id = request.query_params['university_id']
    except:
        university_id = None

    course_ids = []

    if faculty_id is not None:
        course_faculties = CourseFaculty.objects.filter(faculty_id=faculty_id)
        for course_faculty in course_faculties:
            course_ids.append(course_faculty.course.id)
    elif university_id is not None:
        course_universities = CourseUniversity.objects.filter(university_id=university_id)
        for course_university in course_universities:
            course_ids.append(course_university.course.id)
    elif country_id is not None:
        course_universities = CourseUniversity.objects.filter(university__country_id=country_id)
        for course_university in course_universities:
            course_ids.append(course_university.course.id)

    courses_to_compare_with = Course.objects.filter(id__in=course_ids)

    data = {}
    result = {}
    courses_list = []

    courses_to_return = []

    for course in courses_to_compare_with:

        course_to_compare = CourseResult.objects.filter(first_course_id=request.query_params['course'],
                                                        second_course_id=course.id)
        if len(course_to_compare) > 0:
            course_to_compare = course_to_compare[0]
            courses_to_return.append(course_to_compare)

    courses_to_return.sort(key=lambda x: x.result, reverse=True)

    course_data = {}
    course = Course.objects.filter(id=request.query_params['course'])[0]
    course_data["id"] = course.id
    course_data['name'] = course.name
    course_data['description'] = course.description
    if len(course.description) <= 203:
        course_data['short_description'] = course.description
    else:
        course_data['short_description'] = course.description[0:200] + '...'
        course_data['ects'] = course.ects
    try:
        course_data['english_level'] = course.english_level
    except:
        course_data['english_level'] = 1
        course_data['semester'] = course.semester

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
        course_data['country'] = university.country.name
        course_data['city'] = university.city.name
        course_data['universityImg'] = university.img
    except IndexError:
        pass

    courses_list.insert(0, course_data)

    if len(courses_to_return) < 4:
        ret_len = len(courses_to_return)
    else:
        ret_len = 4

    for course_to_compare in courses_to_return[0:ret_len]:

        if float(course_to_compare.result) > 0.01:
            course_data = {}
            course_data['result'] = course_to_compare.result

            course = Course.objects.filter(id=course_to_compare.second_course_id)[0]
            course_data['id'] = course.id
            course_data['name'] = course.name

            course_data['description'] = course.description
            if len(course.description) <= 203:
                course_data['short_description'] = course.description
            else:
                course_data['short_description'] = course.description[0:200] + '...'
            course_data['ects'] = course.ects
            try:
                course_data['english_level'] = course.english_level
            except:
                course_data['english_level'] = 1

            course_data['semester'] = course.semester

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
                course_data['country'] = university.country.name
                course_data['city'] = university.city.name
                course_data['universityImg'] = university.img
            except IndexError:
                pass

            courses_list.append(course_data)

    result['items'] = courses_list
    result['currentItemCount'] = len(courses_list)
    data['data'] = result

    return Response(data)


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
def comparator_text_input(request):
    try:
        country_id = request.query_params['country_id']
    except MultiValueDictKeyError:
        country_id = None
    try:
        faculty_id = request.query_params['faculty_id']
    except MultiValueDictKeyError:
        faculty_id = None
    try:
        university_id = request.query_params['university_id']
    except MultiValueDictKeyError:
        university_id = None

    course_ids = []

    if faculty_id is not None:
        course_faculties = CourseFaculty.objects.filter(faculty_id=faculty_id)
        for course_faculty in course_faculties:
            course_ids.append(course_faculty.course.id)
    elif university_id is not None:
        course_universities = CourseUniversity.objects.filter(university_id=university_id)
        for course_university in course_universities:
            course_ids.append(course_university.course.id)
    elif country_id is not None:
        course_universities = CourseUniversity.objects.filter(university__country_id=country_id)
        for course_university in course_universities:
            course_ids.append(course_university.course.id)

    data = {}
    result = {}
    courses_list = []

    doc = request.data['course_description']
    vec_bow = dictionary.doc2bow(doc.lower().split())
    vec_lsi = lsi[vec_bow]
    index = similarities.MatrixSimilarity(lsi[corpus])

    sims = index[vec_lsi]
    sims = sorted(enumerate(sims), key=lambda item: -item[1])
    sims_filtered = [similarity for similarity in sims if ((similarity[0] + 1) in course_ids)]

    if len(sims_filtered) < 4:
        ret_len = len(sims_filtered)
    else:
        ret_len = 4

    for i in xrange(ret_len):
        course_id = sims_filtered[i][0] + 1
        course = Course.objects.filter(id=course_id)[0]
        course_data = {'result': sims_filtered[i][1], 'id': course.id, 'name': course.name,
                       'description': course.description,
                       'semester': course.semester, 'ects': course.ects}
        if len(course.description) <= 203:
            course_data['short_description'] = course.description
        else:
            course_data['short_description'] = course.description[0:200] + '...'

        try:
            course_data['english_level'] = course.english_level
        except:
            course_data['english_level'] = 1

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
            course_data['country'] = university.country.name
            course_data['city'] = university.city.name
            course_data['universityImg'] = university.img
        except IndexError:
            pass

        courses_list.append(course_data)

    course_text_dummy = {'result': 1, 'id': -1, 'name': '',
                         'description': request.data['course_description'],
                         'semester': -1, 'ects': -1, 'english_level': -1, 'university': '',
                         'country': '', 'city': '', 'universityImage': ''}
    if len(request.data['course_description']) <= 203:
        course_text_dummy['short_description'] = request.data['course_description']
    else:
        course_text_dummy['short_description'] = request.data['course_description'][0:200] + '...'

    courses_list.insert(0, course_text_dummy)

    result['items'] = courses_list
    result['currentItemCount'] = len(courses_list)
    data['data'] = result

    return Response(data)
