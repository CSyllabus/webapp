from rest_framework.parsers import JSONParser
from ..models import Course
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
    #keywords = request.data['keywords']
    #country = request.data['country']
    #city = request.data['university']
    #faculty = request.data['faculty']
    #english_lvl = request.data['english_lvl']
    #semester = request.data['semester']

    keywords = "html web"
    vector = SearchVector('description')
    query = SearchQuery(keywords)
    courses = Course.objects.annotate(rank=SearchRank(vector, query)).filter(rank__gte=0.05).order_by('-rank')
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