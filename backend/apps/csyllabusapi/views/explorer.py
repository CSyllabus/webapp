from rest_framework.parsers import JSONParser
from ..models import Course
from ..models import ProgramFaculty
from ..models import Program
from ..models import CourseProgram
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
    country_id = request.query_params['country']
    city_id = request.query_params['city']
    faculty_id = request.query_params['faculty_id']
    university_id = request.query_params['university']
    semester = request.query_params['semester']


    vector = SearchVector('description')
    query = SearchQuery(keywords)
    program_ids = []
    courses_ids = []
    if(faculty_id):
        program_ids = ProgramFaculty.objects.filter(faculty_id=faculty_id)
    elif (university_id):
        program_ids = ProgramUniversity.objects.filter(faculty_id=faculty_id)
    elif (city_id):
        program_ids = ProgramCity.objects.filter(faculty_id=faculty_id)
    elif(country_id):
        program_ids = ProgramCountry.objects.filter(faculty_id=faculty_id)

    courses_ids = CourseProgram.objects.filter(program_id__in=program_ids)
    courses = Course.objects.filter(id__in=program_ids).annotate(rank=SearchRank(vector, query)).filter(rank__gte=0.05).order_by('-rank')
    result = []
    for course in courses:
        single_course = {}
        single_course['id'] = course.id
        single_course['name'] = course.name
        single_course['description'] = course.description
        single_course['ects'] = course.ects
        single_course['english_level'] = course.english_level
        single_course['semester'] = course.semester
        result.append(single_course)
    return Response(result)