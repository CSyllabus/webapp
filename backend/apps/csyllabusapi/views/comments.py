from rest_framework.parsers import JSONParser, FileUploadParser
from rest_framework.views import APIView
from ..models import Course
from ..models import Program
from ..models import ProgramFaculty
from ..models import Faculty
from ..models import University
from ..models import City
from ..models import Country
from ..models import CourseProgram
from ..models import CourseFaculty
from ..models import CourseUniversity
from ..models import ProgramCity
from ..models import ProgramCountry
from ..models import ProgramUniversity
from ..models import UserCoursePost
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.decorators import parser_classes
from datetime import datetime
from jwt_auth import utils
from jwt_auth.compat import json, User, smart_text
import ast
try:
    from django.utils import simplejson as json
except ImportError:
    import json


@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
class CommentsView(APIView):
    def get(self, request, comment_id=-1, limit=-1, offset=-1):
        query_pairs = request.META['QUERY_STRING'].split('&')

        for query_pair in query_pairs:
            query_pair_split = query_pair.split('=')
            if query_pair_split[0] == 'limit':
                limit = int(query_pair_split[1])
            elif query_pair_split[0] == 'offset':
                offset = int(query_pair_split[1])

        if comment_id >= 0:
            usercourseposts = UserCoursePost.objects.filter(id=comment_id)

        else:
            usercourseposts = UserCoursePost.objects.all().order_by('id')

        data = {}
        result = {}

        try:

            comments_list = []

            for comment in usercourseposts:

                try:

                    comment_data = {'id': comment.id, 'course': comment.course_id, 'author':comment.author, 'content': comment.content, 'show': comment.show, 'modified': comment.modified}


                    comments_list.append(comment_data)

                    data['currentItemCount'] = len(comments_list)
                    data['items'] = comments_list


                except:
                    pass

        except IndexError:
            #print course_id
            data['currentItemCount'] = 0
            data['items'] = []

        result['data'] = data
        return Response(result)


    def delete(selfself, request, comment_id):
        id = comment_id
        UserCoursePost.objects.filter(id=id).delete()
        return Response()