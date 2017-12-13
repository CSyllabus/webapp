from rest_framework.parsers import JSONParser, FileUploadParser
from rest_framework.views import APIView

from ..models import City
from ..models import Country
from ..models import University
from ..models import Faculty
from ..models import ProgramFaculty
from ..models import ProgramUniversity
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
class ProgramView(APIView):

    def get(self, request, faculty_id):
        programs = ProgramFaculty.objects.filter(faculty_id=faculty_id)
        program_ids=[]
        for i in programs:
            program_ids.append(i.program_id)

        result = {}
        data = {}
        programList = []


        for program_id in program_ids:
            program = Program.objects.filter(id=program_id)[0]
            single_program = {}
            single_program['id'] = program.id
            single_program['name'] = program.name + ' - ' + program.study_level
            single_program['created'] = program.created
            single_program['modified'] = program.modified
            single_program['study_level'] = program.study_level
            programList.append(single_program)

        programList.sort(key=lambda x: x['name'], reverse=False)
        data['items'] = programList
        data['currentItemCount'] = programs.count()
        result['data'] = data
        return Response(result)


@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
class ProgramUnivView(APIView):

    def get(self, request, university_id):
        programs = ProgramUniversity.objects.filter(university_id=university_id)
        program_ids=[]
        for i in programs:
            program_ids.append(i.program_id)

        result = {}
        data = {}
        programList = []


        for program_id in program_ids:
            program = Program.objects.filter(id=program_id)[0]
            single_program = {}
            single_program['id'] = program.id
            single_program['name'] = program.name + ' - ' + program.study_level
            single_program['created'] = program.created
            single_program['modified'] = program.modified
            single_program['study_level'] = program.study_level
            programList.append(single_program)

        programList.sort(key=lambda x: x['name'], reverse=False)
        data['items'] = programList
        data['currentItemCount'] = programs.count()
        result['data'] = data
        return Response(result)
