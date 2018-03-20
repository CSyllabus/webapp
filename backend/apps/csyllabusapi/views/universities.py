from django.core.exceptions import FieldDoesNotExist
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
class UniversitiesView(APIView):
    def get(self, request, university_id=-1, limit=-1, offset=-1, sort_by='name', sort_direction='asc'):
        query_pairs = request.META['QUERY_STRING'].split('&')

        universities = []

        for query_pair in query_pairs:
            query_pair_split = query_pair.split('=')
            if query_pair_split[0].lower() == 'limit':
                limit = int(query_pair_split[1])
            elif query_pair_split[0].lower() == 'offset':
                offset = int(query_pair_split[1])
            elif query_pair_split[0].lower() == 'sortby' and query_pair_split[1] != 'undefined':
                sort_by = query_pair_split[1]
            elif query_pair_split[0].lower() == 'sortdirection' and query_pair_split[1] != '':
                print query_pair_split[1]
                sort_direction = query_pair_split[1]

        if university_id >= 0:
            universities = University.objects.filter(id=university_id)

        else:
            if sort_by not in ['id', 'created', 'modified']:
                sort_by = 'name'

            print sort_direction

            if sort_direction == 'desc':
                sort_by = "-" + sort_by

            universities = University.objects.all().order_by(sort_by)

        data = {}
        result = {}
        university_list = []
        for university in universities:
            university_data = {'id': university.id, 'name': university.name, 'description': university.description,
                               'countryId': university.country_id, 'img': university.img,
                               'modified': university.modified, 'created': university.created}
            university_list.append(university_data)

        if limit > 0 and offset >= 0:
            data['currentItemCount'] = limit
            data['items'] = university_list[offset:offset + limit]
        elif limit > 0:
            data['currentItemCount'] = limit
            data['items'] = university_list[0:limit]
        elif offset >= 0:
            count = len(university_list) - offset
            data['currentItemCount'] = count
            data['items'] = university_list[offset:count]
        else:
            data['currentItemCount'] = len(university_list)
            data['items'] = university_list

        result['data'] = data
        return Response(result)

    def post(self, request):
        # name = request.data['name']
        # country = Country.objects.get(id=request.data['country_id'])
        # city = City.objects.get(id=request.data['city_id'])
        # University.objects.create(name=name, country=country, city=city)
        return Response()

    def delete(selfself, request):
        id = request.data['id']
        University.objects.filter(id=id).delete()
        return Response()

    def put(selfself, request, university_id=-1):
        name = request.data['name']
        description = request.data['description']
        img = request.data['img']
        University.objects.filter(id=university_id).update(name=name, description=description, img=img)
        return Response()


@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
class CityUniversitiesView(APIView):
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
        universities_list = []
        for university in universities:
            university_data = {'id': university.id, 'name': university.name, 'modified': university.modified,
                               'created': university.created, 'img': university.img}
            universities_list.append(university_data)

            universities_list.sort(key=lambda x: x['name'], reverse=False)
        data['currentItemCount'] = universities.count()
        data['items'] = universities_list
        result['data'] = data
        return Response(result)

    # def post(self, request):
    #   name = request.data['name']
    #  country = Country.objects.get(id=request.data['country_id'])
    # city = City.objects.get(id=request.data['city_id'])
    # University.objects.create(name=name, country=country, city=city)
    # return Response()

#  def delete(selfself, request):
#       id = request.data['id']
#     University.objects.filter(id=id).delete()
#        return Response()


# def put(selfself, request):
#    id = request.data['id']
#    name = request.data['name']
#    country = Country.objects.get(id=request.data['country_id'])
#    city = City.objects.get(id=request.data['city_id'])
#    University.objects.filter(id=id).update(name=name, country=country, city=city, modified=datetime.utcnow())
#    return Response()
