from rest_framework.parsers import JSONParser, FileUploadParser
from rest_framework.views import APIView

from ..models import City
from ..models import Country
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
class CountryView(APIView):

    def get(self, request):
        countries = Country.objects.all()
        data = {}
        result = {}
        countriesList = []
        for country in countries:
            one_country = {}
            one_country['id'] = country.id
            one_country['name'] = country.name
            one_country['img'] = country.img
            one_country['modified'] = country.modified
            one_country['created'] = country.created
            countriesList.append(one_country)
        data['currentItemCount'] = countries.count()
        data['items'] = countriesList
        result['data'] = data
        return Response(result)

    def post(self, request, format=json):
        name = request.data['name']
        country = Country.objects.create(name=name)
        return Response()

    def delete(selfself, request):
        id = request.data['id']
        Country.objects.filter(id=id).delete()
        return Response()

    def put(selfself, request):
        id = request.data['id']
        name = request.data['name']
        Country.objects.filter(id=id).update(name=name, modified=datetime.utcnow())
        return Response()
