from rest_framework.parsers import JSONParser, FileUploadParser
from rest_framework.views import APIView

from ..models import City
from ..models import Country
from ..models import University
from ..models import Faculty
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
class UniversityView(APIView):

    def get(self, request):
        universities = University.objects.all()
        result = []
        for university in universities:
            single_univeristy = {}
            faculties = Faculty.objects.filter(university=university)
         #   programs = Program.objects.filter(university=university)
            # talk with emanuel about faculty and university programs
            faculty_list = []
            programs_list = []
            for faculty in faculties:
                single_faculty = {}
                single_faculty['id'] = faculty.id
                single_faculty['name'] = faculty.name
                faculty_list.append(single_faculty)
           # for program in programs:
           #     single_program = {}
           #     single_program['id'] = program.id
           #     single_program['name'] = program.name
           #     single_program['study_level'] = program.study_level
            single_univeristy['name'] = university.name
            single_univeristy['id'] = university.id
            single_univeristy['created'] = university.created
            single_univeristy['modified'] = university.modified
            single_univeristy['country_id'] = university.country_id
            single_univeristy['city_id'] = university.city_id
            single_univeristy['faculties'] = faculty_list
            result.append(single_univeristy)

        return Response(result)


    def post(self, request):
        name = request.data['name']
        country = Country.objects.get(id=request.data['country_id'])
        city = City.objects.get(id=request.data['city_id'])
        University.objects.create(name=name, country=country, city=city)
        return Response()


    def delete(selfself, request):
        id = request.data['id']
        University.objects.filter(id=id).delete()
        return Response()


    def put(selfself, request):
        id = request.data['id']
        name = request.data['name']
        country = Country.objects.get(id=request.data['country_id'])
        city = City.objects.get(id=request.data['city_id'])
        University.objects.filter(id=id).update(name=name, country=country, city=city, modified=datetime.utcnow())

        return Response()
