from rest_framework.parsers import JSONParser
from ..models import Course
from ..models import CourseResult
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
def comparator(request):

    try:
        country_id = request.query_params['country_id']
    except:
        country_id = None
    try:
        city_id = request.query_params['city_id']
    except:
        city_id = None
    try:
        faculty_id = request.query_params['faculty_id']
    except:
        faculty_id = None
    try:
        university_id = request.query_params['university_id']
    except:
        university_id = None
   # semester = request.query_params['semester']


    program_ids = []
    courses_obj = []
    courses_ids = []

    if(faculty_id is not None):
        program_ids = ProgramFaculty.objects.filter(faculty_id=faculty_id).values_list('program_id', flat=True)
    elif (university_id is not None):
        program_ids = ProgramUniversity.objects.filter(university_id=university_id).values_list('program_id', flat=True)
    elif (city_id is not None):
        program_ids = ProgramCity.objects.filter(city_id=city_id).values_list('program_id', flat=True)
    elif(country_id is not None):
        program_ids = ProgramCountry.objects.filter(country_id=country_id).values_list('program_id', flat=True)

    courses_obj = CourseProgram.objects.filter(program_id__in=program_ids)
    for i in courses_obj:
        courses_ids.append(i.course_id)
    courses_to_compare_with = Course.objects.filter(id__in=courses_ids)

    data = {}
    result = {}
    courseList = []

    courses_to_return = [];





    for course in courses_to_compare_with:

        course_to_compare = CourseResult.objects.filter(first_course_id=request.query_params['course'],
                                                        second_course_id=course.id)
        if len(course_to_compare) > 0:
            course_to_compare = course_to_compare[0]
            courses_to_return.append(course_to_compare)

    courses_to_return.sort(key=lambda x: x.result, reverse=True)



    main_course={}



    m_course=Course.objects.filter(id=request.query_params['course'])[0]

    main_course["id"]=m_course.id;
    main_course['name'] = m_course.name
    main_course['description'] = m_course.description
    if len(m_course.description) <= 203:
        main_course['short_description'] = m_course.description
    else:
        main_course['short_description'] = m_course.description[0:200] + '...'
        main_course['ects'] = m_course.ects
    try:
        main_course['english_level'] = m_course.english_level
    except:
        main_course['english_level'] = 1
    main_course['semester'] = m_course.semester

    main_program = CourseProgram.objects.filter(course_id=m_course.id)

    if main_program is not None:
        course_program = main_program[0]
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
            main_course['faculty'] = faculty.name
        if program_university is not None:
            university = University.objects.filter(id=program_university.university.id)[0]
            main_course['university'] = university.name
        if program_city is not None:
            city = City.objects.filter(id=program_city.city.id)[0]
            main_course['city'] = city.name

        if program_country is not None:
            country = Country.objects.filter(id=program_country.country.id)[0]
            main_course['country'] = country.name



    if len(courses_to_return) < 4:
        ret_len = len(courses_to_return)
    else:
        ret_len = 4

    for course_to_compare in courses_to_return[0:ret_len]:

        if float(course_to_compare.result) > 0.01:
            single_course = {}
            single_course['result'] = course_to_compare.result

            course = Course.objects.filter(id=course_to_compare.second_course_id)[0]
            single_course['id'] = course.id
            single_course['name'] = course.name

            single_course['description'] = course.description
            if len(course.description) <= 203:
                single_course['short_description'] = course.description
            else:
                single_course['short_description'] = course.description[0:200] + '...'
            single_course['ects'] = course.ects
            try:
                single_course['english_level'] = course.english_level
            except:
                single_course['english_level'] = 1

            single_course['semester'] = course.semester

            course_program = CourseProgram.objects.filter(course_id=course.id)

            if course_program is not None:
                course_program = course_program[0]
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
                    single_course['faculty'] = faculty.name
                if program_university is not None:
                    university = University.objects.filter(id=program_university.university.id)[0]
                    single_course['university'] = university.name
                if program_city is not None:
                    city = City.objects.filter(id=program_city.city.id)[0]
                    single_course['city'] = city.name

                if program_country is not None:
                    country = Country.objects.filter(id=program_country.country.id)[0]
                    single_course['country'] = country.name
            courseList.append(single_course)

    courseList.insert(0, main_course)
    #print (main_course)
    #print courseList
    result['items'] = courseList
    result['currentItemCount'] = len(courseList)
    data['data'] = result

    #print (len(courseList))



    #print (data);

    return Response(data)