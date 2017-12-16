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
                         'username': user.username, 'email': user.email}
            users_list.append(user_data)
            data['currentItemCount'] = 1
        except (IndexError, AttributeError) as e:
            data['currentItemCount'] = 0

        data['items'] = users_list
        result['data'] = data

        return Response(result)

    def put(self, request):

        data = {}
        result = {}
        users_list = []

        try:
            decoded_payload = utils.jwt_decode_handler(
                request.META.get('HTTP_AUTHORIZATION').strip().split("JWT ")[1])
            user = User.objects.filter(id=decoded_payload['user_id'])[0]

            try:
                user.username = request.data['username']
            except:
                pass
            try:
                user.first_name = request.data['first_name']
            except:
                pass
            try:
                user.last_name = request.data['last_name']
            except:
                pass
            try:
                user.email = request.data['email']
            except:
                pass
            try:
                new_password = request.data['newPassword']
                user.set_password(new_password)
            except:
                pass

            user.save()

            user_data = {'id': user.id, 'first_name': user.first_name, 'last_name': user.last_name,
                         'username': user.username, 'email': user.email}
            users_list.append(user_data)
            data['currentItemCount'] = 1
        except (IndexError, AttributeError) as e:
            data['currentItemCount'] = 0

        data['items'] = users_list
        result['data'] = data

        return Response()

@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
class UserView(APIView):
    def get(self, request, user_id=-1, limit=-1, offset=-1):
        query_pairs = request.META['QUERY_STRING'].split('&')

        for query_pair in query_pairs:
            query_pair_split = query_pair.split('=')
            if query_pair_split[0] == 'limit':
                limit = int(query_pair_split[1])
            elif query_pair_split[0] == 'offset':
                offset = int(query_pair_split[1])

        if user_id >= 0:
            users = User.objects.filter(id=user_id)
        else:
            users = User.objects.all().order_by('username')

        data = {}
        result = {}
        users_list = []
        for user in users:

            user_data = {'id': user.id, 'first_name': user.first_name, 'last_name': user.last_name,
                         'username': user.username, 'email': user.email}

           # try:
            #    user_faculty = UserFaculty.objects.filter(user_id=user.id).select_related('faculty')[0]
            #    user_data['faculty'] = user_faculty.faculty.name
           # except IndexError:
           #     pass

          #  try:
          #      user_university = CourseUniversity.objects.filter(user_id=user.id).select_related('university__country')[0]
           #     university = user_university.university
           #     user_data['university'] = university.name
           #     user_data['country'] = university.country.name
          #  except IndexError:
           #     pass

            users_list.append(user_data)

        if limit > 0 and offset >= 0:
            data['currentItemCount'] = limit
            data['items'] = users_list[offset:offset + limit]
        elif limit > 0:
            data['currentItemCount'] = limit
            data['items'] = users_list[0:limit]
        elif offset >= 0:
            count = len(users_list)
            data['currentItemCount'] = count
            data['items'] = users_list[offset:count]
        else:
            data['currentItemCount'] = len(users_list)
            data['items'] = users_list

        result['data'] = data
        return Response(result)

    def put(self, request, user_id):

        data = {}
        result = {}
        users_list = []

        try:
            #decoded_payload = utils.jwt_decode_handler(
            #    request.META.get('HTTP_AUTHORIZATION').strip().split("JWT ")[1])
            user = User.objects.filter(id=user_id)[0]

            try:
                user.username = request.data['username']
            except:
                pass
            try:
                user.first_name = request.data['first_name']
            except:
                pass
            try:
                user.last_name = request.data['last_name']
            except:
                pass
            try:
                user.email = request.data['email']
            except:
                pass
            try:
                new_password = request.data['newPassword']
                user.set_password(new_password)
            except:
                pass

            user.save()

            user_data = {'id': user.id, 'first_name': user.first_name, 'last_name': user.last_name,
                         'username': user.username, 'email': user.email}
            users_list.append(user_data)
            data['currentItemCount'] = 1
        except (IndexError, AttributeError) as e:
            data['currentItemCount'] = 0

        data['items'] = users_list
        result['data'] = data

        return Response()

    def post(self, request):

        data = {}
        result = {}
        users_list = []

        try:
            #decoded_payload = utils.jwt_decode_handler(
            #    request.META.get('HTTP_AUTHORIZATION').strip().split("JWT ")[1])
            #user = User.objects.filter(id=decoded_payload['user_id'])[0]

            user = User.objects.create()
            try:
                user.username = request.data['username']
            except:
                pass
            try:
                user.first_name = request.data['first_name']
            except:
                pass
            try:
                user.last_name = request.data['last_name']
            except:
                pass
            try:
                user.email = request.data['email']
            except:
                pass
            try:
                user.set_password(request.data['newPassword'])
            except:
                pass

            user.save()

            user_data = {'id': user.id, 'first_name': user.first_name, 'last_name': user.last_name,
                         'username': user.username, 'email': user.email}
            users_list.append(user_data)
            data['currentItemCount'] = 1
        except (IndexError, AttributeError) as e:
            data['currentItemCount'] = 0

        data['items'] = users_list
        result['data'] = data

        return Response()

    def delete(self, request, user_id):
        User.objects.filter(id=user_id).delete()
        return Response()