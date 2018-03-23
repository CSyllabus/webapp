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
class CitiesView(APIView):
    def get(self, request, country_id):
        cities = City.objects.filter(country_id=country_id)
        result = {}
        city_list = []
        data = {}
        for city in cities:
            city_data = {'name': city.name, 'img': city.img, 'id': city.id, 'created': city.created,
                         'modified': city.modified, 'country_id': city.country_id}
            city_list.append(city_data)

            data['items'] = city_list
            data['currentItemCount'] = cities.count()
            result['data'] = data

        return Response(result)
