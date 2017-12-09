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

class UniversitiesViewAll(APIView):
    def get(self, request):
        universities = University.objects.all()
        data = {}
        result = {}
        universitiesList = []
        for university in universities:
            one_university = {}
            one_university['id'] = university.id
            one_university['name'] = university.name
            one_university['countryId'] = university.country_id
            # one_university['img'] = university.img
            one_university['modified'] = university.modified
            one_university['created'] = university.created
            universitiesList.append(one_university)

        universitiesList.sort(key=lambda x: x['name'], reverse=False)
        data['currentItemCount'] = universities.count()
        data['items'] = universitiesList
        result['data'] = data
        return Response(result)


@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))

class UniversitiesView(APIView):
    def get(self, request, city_id):
        universities = University.objects.filter(city_id=city_id)
        result = {}
        data = {}
        university_list = []
        for university in universities:
            single_univeristy = {}
            single_univeristy['name'] = university.name
            single_univeristy['img'] = university.img
            single_univeristy['id'] = university.id
            single_univeristy['created'] = university.created
            single_univeristy['modified'] = university.modified
            single_univeristy['country_id'] = university.country_id
            single_univeristy['city_id'] = university.city_id
            university_list.append(single_univeristy)

        university_list.sort(key=lambda x: x['name'], reverse=False)
        data['items'] = university_list
        data['currentItemCount'] = universities.count()
        result['data'] = data
        return Response(result)

@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
class UniversitiesViewCountry(APIView):
    def get(self, request, country_id):
        universities = University.objects.filter(country_id=country_id)
        data = {}
        result = {}
        universitiesList = []
        for university in universities:
            one_university = {}
            one_university['id'] = university.id
            one_university['name'] = university.name
                    # one_university['img'] = university.img
            one_university['modified'] = university.modified
            one_university['created'] = university.created
            universitiesList.append(one_university)

        universitiesList.sort(key=lambda x: x['name'], reverse=False)
        data['currentItemCount'] = universities.count()
        data['items'] = universitiesList
        result['data'] = data
        return Response(result)






    #def post(self, request):
     #   name = request.data['name']
      #  country = Country.objects.get(id=request.data['country_id'])
       # city = City.objects.get(id=request.data['city_id'])
        #University.objects.create(name=name, country=country, city=city)
        #return Response()


  #  def delete(selfself, request):
 #       id = request.data['id']
   #     University.objects.filter(id=id).delete()
#        return Response()


    #def put(selfself, request):
    #    id = request.data['id']
    #    name = request.data['name']
    #    country = Country.objects.get(id=request.data['country_id'])
    #    city = City.objects.get(id=request.data['city_id'])
    #    University.objects.filter(id=id).update(name=name, country=country, city=city, modified=datetime.utcnow())
    #    return Response()
