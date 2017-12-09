from rest_framework.parsers import JSONParser, FileUploadParser
from rest_framework.views import APIView

from ..models import City
from ..models import Country
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.decorators import parser_classes
from django.utils import timezone

try:
    from django.utils import simplejson as json
except ImportError:
    import json

@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
class CountryView(APIView):

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
        Country.objects.filter(id=id).update(name=name, modified=timezone.now())
        return Response()
