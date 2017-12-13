from rest_framework.parsers import JSONParser, FileUploadParser
from rest_framework.views import APIView

from ..models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.decorators import parser_classes
from datetime import datetime
try:
    from django.utils import simplejson as json
except ImportError:
    import json
from jwt_auth import utils
@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))

class UserViewSelf(APIView):
    def get(self, request):

        data = {}
        result = {}
        users_list = []

        try:
            decoded_payload = utils.jwt_decode_handler(request.META.get('HTTP_AUTHORIZATION').strip().split("JWT ")[1])
            user = User.objects.filter(id=decoded_payload['user_id'])[0]
            user_data = {'id': user.id, 'first_name': user.first_name, 'last_name': user.last_name,
                         'username': user.username}
            users_list.append(user_data)
            data['currentItemCount'] = 1
        except IndexError:
            data['currentItemCount'] = 0

        data['items'] = users_list
        result['data'] = data

        return Response(result)