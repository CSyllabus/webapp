from rest_framework.parsers import JSONParser, FileUploadParser
from rest_framework.views import APIView
from ..models import Course
from ..models import Program
from ..models import ProgramFaculty
from ..models import Faculty
from ..models import University
from ..models import City
from ..models import Country
from ..models import CourseProgram
from ..models import CourseFaculty
from ..models import CourseUniversity
from ..models import ProgramCity
from ..models import ProgramCountry
from ..models import ProgramUniversity
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.decorators import parser_classes
from datetime import datetime
from jwt_auth import utils
from jwt_auth.compat import json, User, smart_text


try:
    from django.utils import simplejson as json
except ImportError:
    import json


@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
class CourseView(APIView):
    def get(self, request, course_id=-1):

        if course_id >= 0:
            courses = Course.objects.filter(id=course_id)
        else:
            courses = Course.objects.all()
        data = {}
        result = {}
        coursesList = []
        for course in courses:
            one_course = {}
            one_course['id'] = course.id
            one_course['name'] = course.name
            one_course['description'] = course.description
            one_course['ects'] = course.ects
            one_course['english_level'] = course.english_level
            one_course['semester'] = course.semester
            one_course['modified'] = course.modified
            one_course['created'] = course.created

            try:
                course_program = CourseProgram.objects.filter(course_id=course.id)[0]

                program_id = course_program.program_id
                study_lvl = Program.objects.filter(id=program_id)[0]
                one_course['study_lvl'] = study_lvl.study_level
            except:
                course_program = None


            if course_program is not None:
                #program_faculty = ProgramFaculty.objects.filter(program_id=course_program.program_id)[0]

                try:
                    program_faculty = ProgramFaculty.objects.filter(program_id=course_program.program_id)[0]
                except:
                    program_faculty = None

                program_university = ProgramUniversity.objects.filter(program_id=course_program.program_id)[0]
                program_city = ProgramCity.objects.filter(program_id=course_program.program_id)[0]
                program_country = ProgramCountry.objects.filter(program_id=course_program.program_id)[0]

                if program_faculty is not None:
                    faculty = Faculty.objects.filter(id=program_faculty.faculty.id)[0]
                    one_course['faculty'] = faculty.name
                if program_university is not None:
                    university = University.objects.filter(id=program_university.university.id)[0]
                    one_course['university'] = university.name
                if program_city is not None:
                    city = City.objects.filter(id=program_city.city.id)[0]
                    one_course['city'] = city.name
                if program_country is not None:
                    country = Country.objects.filter(id=program_country.country.id)[0]
                    one_course['country'] = country.name

            coursesList.append(one_course)
        data['currentItemCount'] = courses.count()
        data['items'] = coursesList
        result['data'] = data
        return Response(result)

    def post(self, request, format=json):
        name = request.data['name']
        course = Course.objects.create(name=name)
        print(request.META.get('HTTP_AUTHORIZATION'))

        decoded_payload = utils.jwt_decode_handler(request.META.get('HTTP_AUTHORIZATION').strip().split("JWT ")[1])
        print(decoded_payload)

        return Response()

    def delete(selfself, request):
        id = request.data['id']
        Course.objects.filter(id=id).delete()
        return Response()

    def put(selfself, request):
        id = request.data['id']
        name = request.data['name']
        Course.objects.filter(id=id).update(name=name, modified=datetime.utcnow())
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
        coursesList = []
        for course_id in course_ids:
            course = Course.objects.filter(id=course_id)[0]
            one_course = {}
            one_course['id'] = course.id
            one_course['name'] = course.name
            one_course['description'] = course.description
            one_course['ects'] = course.ects
            one_course['english_level'] = course.english_level
            one_course['semester'] = course.semester
            one_course['modified'] = course.modified
            one_course['created'] = course.created
            coursesList.append(one_course)

        coursesList.sort(key=lambda x: x['name'], reverse=False)
        data['currentItemCount'] = len(course_ids)
        data['items'] = coursesList
        result['data'] = data
        return Response(result)


@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
class CourseByFacultyView(APIView):
    def get(self, request, faculty_id):

        course_faculty = CourseFaculty.objects.filter(faculty_id=faculty_id)

        course_ids = []
        for i in course_faculty:
            course_ids.append(i.course_id)

        data = {}
        result = {}
        coursesList = []
        for course_id in course_ids:
            course = Course.objects.filter(id=course_id)[0]
            one_course = {}
            one_course['id'] = course.id
            one_course['name'] = course.name
            one_course['description'] = course.description
            if len(course.description) <= 203:
                one_course['short_description'] = course.description
            else:
                one_course['short_description'] = course.description[0:200] + '...'

            one_course['ects'] = course.ects
            one_course['english_level'] = course.english_level
            one_course['semester'] = course.semester
            one_course['modified'] = course.modified
            one_course['created'] = course.created
            faculty = Faculty.objects.filter(id=faculty_id)[0]
            one_course['faculty'] = faculty.name

            try:
                course_university = CourseUniversity.objects.filter(course_id=course.id)[0]
            except:
                course_university = None

            if course_university is not None:
                university = University.objects.filter(id=course_university.university_id)[0]
                one_course['university'] = university.name
                country = Country.objects.filter(id=university.country_id)[0]
                one_course['country'] = country.name








            coursesList.append(one_course)

        coursesList.sort(key=lambda x: x['name'], reverse=False)
        data['currentItemCount'] = len(course_ids)
        data['items'] = coursesList
        result['data'] = data
        return Response(result)

