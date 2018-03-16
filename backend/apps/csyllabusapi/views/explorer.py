from rest_framework.parsers import JSONParser
from ..models import Course
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
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank

try:
    from django.utils import simplejson as json
except ImportError:
    import json


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
def explorer(request):
    keywords = request.query_params['keywords'].split('-')
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

    vector = SearchVector(*['description', 'name'])

    queries = SearchQuery(keywords[0])
    for i, keyword in enumerate(keywords):
        if i == 0:
            continue
        queries |= SearchQuery(keyword)

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

    courses = Course.objects.filter(id__in=course_ids).annotate(rank=SearchRank(vector, queries)).filter(
        rank__gte=0.04).order_by('-rank')

    data = {}
    result = {}
    courses_list = []
    for course in courses:
        course_data = {'rank': course.rank, 'id': course.id, 'name': course.name, 'description': course.description,
                       'semester': course.semester}
        if len(course.description) <= 203:
            course_data['short_description'] = course.description
        else:
            course_data['short_description'] = course.description[0:200] + '...'
        course_data['ects'] = course.ects
        try:
            course_data['english_level'] = course.english_level
        except:
            course_data['english_level'] = 1

        course_program = CourseProgram.objects.filter(course_id=course.id)[0]

        if course_program is not None:

            try:
                program_faculty = ProgramFaculty.objects.filter(program_id=course_program.program_id)[0]
            except:
                program_faculty = None
            # program_faculty = ProgramFaculty.objects.filter(program_id=course_program.program_id)[0]
            program_university = ProgramUniversity.objects.filter(program_id=course_program.program_id)[0]
            program_city = ProgramCity.objects.filter(program_id=course_program.program_id)[0]
            program_country = ProgramCountry.objects.filter(program_id=course_program.program_id)[0]

            if program_faculty is not None:
                faculty = Faculty.objects.filter(id=program_faculty.faculty.id)[0]
                course_data['faculty'] = faculty.name
            if program_university is not None:
                university = University.objects.filter(id=program_university.university.id)[0]
                course_data['university'] = university.name
            if program_city is not None:
                city = City.objects.filter(id=program_city.city.id)[0]
                course_data['city'] = city.name
            if program_country is not None:
                country = Country.objects.filter(id=program_country.country.id)[0]
                course_data['country'] = country.name

        courses_list.append(course_data)

    result['items'] = courses_list
    result['currentItemCount'] = courses.count()
    data['data'] = result

    return Response(data)
