from rest_framework.parsers import JSONParser, FileUploadParser
from rest_framework.views import APIView

from ..models import City
from ..models import Country
from ..models import University
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

# create new /city
    def post(self, request):
        name = request.data['name']
        country_id = request.data['country_id']
        country = Country.objects.get(id=country_id)
        City.objects.create(name=name, country=country)
        return Response()

# delete /city
    def delete(selfself, request):
        id = request.data['id']
        City.objects.filter(id=id).delete()
        return Response()

# edit /city
    def put(selfself, request):
        id = request.data['id']
        name = request.data['name']
        country = Country.objects.get(id=request.data['country_id'])
        City.objects.filter(id=id).update(name=name, country=country, modified=datetime.utcnow())
        return Response()
