from rest_framework.parsers import JSONParser
from ..models import Course
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.decorators import parser_classes

try:
    from django.utils import simplejson as json
except ImportError:
    import json


@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
@parser_classes((JSONParser,))
def getCourseByDescription(request):
        attribute = "machine learning"

        courses = Course.objects.all()

        result = []
        for course in courses:
            one_course = {}
            one_course['name'] = course.name
            one_course['description'] = course.description
            if(attribute in course.description):
                result.append(one_course)

        return Response(result)
