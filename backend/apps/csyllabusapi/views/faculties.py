from rest_framework.parsers import JSONParser, FileUploadParser
from rest_framework.views import APIView

from ..models import City
from ..models import Country
from ..models import University
from ..models import Faculty
from ..models import ProgramFaculty
from ..models import Program
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.decorators import parser_classes
from datetime import datetime

try:
    from django.utils import simplejson as json
except ImportError:
    import json

@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
class FacultyView(APIView):

    def get(self, request, university_id):
        faculties = Faculty.objects.filter(university_id=university_id)
        result = {}
        data = {}
        facultyList = []
        for faculty in faculties:

            single_faculty = {}
            single_faculty['name'] = faculty.name
            single_faculty['id'] = faculty.id
            single_faculty['created'] = faculty.created
            single_faculty['modified'] = faculty.modified
            single_faculty['university_id'] = faculty.university_id
            single_faculty['city_id'] = faculty.city_id
            facultyList.append(single_faculty)

        data['items'] = facultyList
        data['currentItemCount'] = faculties.count()
        result['data'] = data
        return Response(result)



        return Response()
