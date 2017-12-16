from rest_framework.parsers import JSONParser
from ..models import Course
from ..models import ProgramFaculty
from ..models import Faculty
from ..models import University
from ..models import City
from ..models import Country
from ..models import CourseProgram
from ..models import ProgramCity
from ..models import ProgramCountry
from ..models import ProgramUniversity

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.decorators import parser_classes
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank

try:
    from django.utils import simplejson as json
except ImportError:
    import json


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
def explorer(request):
    keywords = request.query_params['keywords']
    #keywords = keywords.replace(",", " ")
    try:
        country_id = request.query_params['country_id']
    except:
        country_id = None
    #try:
    #    city_id = request.query_params['city_id']
    #except:
    #    city_id = None
    try:
        faculty_id = request.query_params['faculty_id']
    except:
        faculty_id = None
    try:
        university_id = request.query_params['university_id']
    except:
        university_id = None

    vector = SearchVector(*['description','name'])
    query = SearchQuery(keywords)
    program_ids = []
    courses_obj = []
    courses_ids = []

    if(faculty_id is not None):
        program_ids = ProgramFaculty.objects.filter(faculty_id=faculty_id).values_list('program_id', flat=True)
    elif (university_id is not None):
        program_ids = ProgramUniversity.objects.filter(university_id=university_id).values_list('program_id', flat=True)
    #elif (city_id is not None):
    #    program_ids = ProgramCity.objects.filter(city_id=city_id).values_list('program_id', flat=True)
    elif(country_id is not None):
        program_ids = ProgramCountry.objects.filter(country_id=country_id).values_list('program_id', flat=True)

    courses_obj = CourseProgram.objects.filter(program_id__in=program_ids)

    for i in courses_obj:
        courses_ids.append(i.course_id)

    courses = Course.objects.filter(id__in=courses_ids).annotate(rank=SearchRank(vector, query)).filter(rank__gte=0.05).order_by('-rank')

    data = {}
    result = {}
    courseList = []
    for course in courses:
        single_course = {}
        single_course['rank'] = course.rank
        single_course['id'] = course.id
        single_course['name'] = course.name

        single_course['description'] = course.description
        if len(course.description) <= 203:
            single_course['short_description'] = course.description
        else:
            single_course['short_description'] = course.description[0:200]+'...'
        single_course['ects'] = course.ects
        try:
            single_course['english_level'] = course.english_level
        except:
            single_course['english_level'] = 1

        single_course['semester'] = course.semester

        course_program = CourseProgram.objects.filter(course_id=course.id)[0]


        if course_program is not None:

            try:
                program_faculty = ProgramFaculty.objects.filter(program_id=course_program.program_id)[0]
            except:
                program_faculty = None
            #program_faculty = ProgramFaculty.objects.filter(program_id=course_program.program_id)[0]
            program_university = ProgramUniversity.objects.filter(program_id=course_program.program_id)[0]
            program_city = ProgramCity.objects.filter(program_id=course_program.program_id)[0]
            program_country = ProgramCountry.objects.filter(program_id=course_program.program_id)[0]

            if program_faculty is not None:
                faculty = Faculty.objects.filter(id=program_faculty.faculty.id)[0]
                single_course['faculty'] = faculty.name
            if program_university is not None:
                university = University.objects.filter(id = program_university.university.id)[0]
                single_course['university'] = university.name
            if program_city is not None:
                city = City.objects.filter(id = program_city.city.id)[0]
                single_course['city'] = city.name

            if program_country is not None:
                country = Country.objects.filter(id = program_country.country.id)[0]
                single_course['country'] = country.name
        courseList.append(single_course)

    result['items'] = courseList
    result['currentItemCount'] = courses.count()
    data['data'] = result

    return Response(data)