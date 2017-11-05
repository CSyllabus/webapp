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
class CityView(APIView):

    def get(self, request):
        cities = City.objects.all()
        result = []
        for city in cities:
            one_country = {}
            one_country['name'] = city.name
            result.append(one_country)

        return Response(result)

    def post(self, request):
        name = request.data['name']
        country = Country.objects.get(id=request.data['country_id'])
        City.objects.create(name=name, country=country)
        return Response()

    def delete(selfself, request):
        id = request.data['id']
        City.objects.filter(id=id).delete()
        return Response()

    def put(selfself, request):
        id = request.data['id']
        name = request.data['name']
        country = Country.objects.get(id=request.data['country_id'])
        City.objects.filter(id=id).update(name=name, country=country, modified=datetime.utcnow())
        return Response()
