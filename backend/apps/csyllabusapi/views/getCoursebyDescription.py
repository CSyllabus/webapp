from rest_framework.parsers import JSONParser
from ..models import Course
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.decorators import parser_classes
#No module, have to add?
# from django.contrib.postgres.search import SearchQuery, SearchVector, SearchRank

try:
    from django.utils import simplejson as json
except ImportError:
    import json


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
def getCourseByDescription(request):


        attribute = "machine learning"

        vector = SearchVector('Course__description')
        query = SearchQuery(attribute)
        result = Entry.objects.annotate(rank=SearchRank(vector, query)).orderby('-rank')

        return Response(result)