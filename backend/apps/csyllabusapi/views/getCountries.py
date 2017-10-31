from rest_framework.parsers import JSONParser
from ..models import Country
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.decorators import parser_classes

try:
    from django.utils import simplejson as json
except ImportError:
    import json


@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
@parser_classes((JSONParser,))
def getCountries(request):

        countries = Country.objects.all()

        result = []
        for country in countries:
            one_country = {}
            one_country['name'] = country.name
            result.append(one_country)

        return Response(result)
