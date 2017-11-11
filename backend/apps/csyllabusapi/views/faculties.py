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

    def get(self, request):
        faculties = Faculty.objects.all()
        result = []
        for faculty in faculties:
            programs_list = []
            single_faculty = {}
            faculty_programs = ProgramFaculty.objects.filter(faculty=faculty)
            programs_id = []
            for faculty_program in faculty_programs:
                programs_id.append(faculty_program.id)
            programs = Program.objects.filter(id__in=programs_id)

            for program in programs:
                single_program = {}
                single_program['id'] = program.id
                single_program['name'] = program.name
                single_program['study_level'] = program.study_level
                programs_list.append(single_program)
            single_faculty['name'] = faculty.name
            single_faculty['id'] = faculty.id
            single_faculty['created'] = faculty.created
            single_faculty['modified'] = faculty.modified
            single_faculty['university_id'] = faculty.university_id
            single_faculty['city_id'] = faculty.city_id
            single_faculty['programs'] = programs_list
            result.append(single_faculty)
        print (result)
        return Response(result)



        return Response()
