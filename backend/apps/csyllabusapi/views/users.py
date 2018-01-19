from time import timezone

from rest_framework.parsers import JSONParser, FileUploadParser
from rest_framework.views import APIView

from ..models import User
from ..models import UserFacultyPost
from ..models import AdminFaculty
from ..models import AdminUniversity
from ..models import Faculty
from ..models import University
from ..models import CourseFaculty
from ..models import CourseUniversity
from ..models import Course

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
        result['output'] = request.META.get('HTTP_AUTHORIZATION')
        try:
            decoded_payload = utils.jwt_decode_handler(request.META.get('HTTP_AUTHORIZATION').strip().split("JWT ")[1])
            user = User.objects.filter(id=decoded_payload['user_id'])[0]

            facultyId = 0
            universityId = 0

            try:
                adminfaculty = AdminFaculty.objects.filter(user_id=user.id)[0]
                facultyId = adminfaculty.faculty_id
            except:
                pass

            try:
                adminuniversity = AdminUniversity.objects.filter(user_id=user.id)[0]
                universityId = adminuniversity.university_id
            except:
                pass

            user_data = {'id': user.id, 'first_name': user.first_name, 'last_name': user.last_name,
                         'username': user.username, 'email': user.email, 'universityId': universityId,
                         'facultyId': facultyId, 'is_admin': user.is_admin}
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

        print request.data['username']

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

            try:
                faculty_id = request.data['faculty']
                faculty = Faculty.objects.filter(id=faculty_id)

                AdminFaculty.objects.create(faculty=faculty[0], user=user)
                AdminUniversity.objects.filter(user=user).delete()
            except:
                pass

            try:
                university_id = request.data['university']
                university = University.objects.filter(id=university_id)

                AdminUniversity.objects.create(university=university[0], user=user)
                AdminFaculty.objects.filter(user=user).delete()

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

        sortby = 'username'
        sortdirection = 'asc'

        for query_pair in query_pairs:
            query_pair_split = query_pair.split('=')
            if query_pair_split[0] == 'limit':
                limit = int(query_pair_split[1])
            elif query_pair_split[0] == 'offset':
                offset = int(query_pair_split[1])
            elif query_pair_split[0] == 'sortby' and query_pair_split[1] != 'undefined':
                sortby = query_pair_split[1]
            elif query_pair_split[0] == 'sortdirection' and query_pair_split[1] != '':
                sortdirection = query_pair_split[1]

        facultyId = 0
        universityId = 0

        data = {}
        result = {}
        users_list = []

        if user_id >= 0:
            users = User.objects.filter(id=user_id)

        else:
            users = User.objects.all().order_by('username')

        for user in users:
            try:
                adminfaculty = AdminFaculty.objects.filter(user_id=user.id)[0]
                facultyId = adminfaculty.faculty_id
            except:
                pass

            try:
                adminuniversity = AdminUniversity.objects.filter(user_id=user.id)[0]
                universityId = adminuniversity.university_id
            except:
                pass

            user_data = {'id': user.id, 'first_name': user.first_name, 'last_name': user.last_name,
                         'username': user.username, 'email': user.email, 'modified': user.modified,
                         'facultyId': facultyId, 'universityId': universityId, 'is_admin': user.is_admin}

            users_list.append(user_data)

        if sortby == 'id':
            if sortdirection == 'asc':
                users_list.sort(key=lambda x: x['id'], reverse=False)
            else:
                users_list.sort(key=lambda x: x['id'], reverse=True)
        elif sortby == 'modified':
            if sortdirection == 'asc':
                users_list.sort(key=lambda x: x['modified'], reverse=False)
            else:
                users_list.sort(key=lambda x: x['modified'], reverse=True)

        else:
            if sortdirection == 'asc':
                users_list.sort(key=lambda x: x['username'], reverse=False)
            else:
                users_list.sort(key=lambda x: x['username'], reverse=True)

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
            decoded_payload = utils.jwt_decode_handler(
                request.META.get('HTTP_AUTHORIZATION').strip().split("JWT ")[1])
            user_isadmin = User.objects.filter(id=decoded_payload['user_id'])[0].is_admin

            if (user_isadmin):
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


                try:
                    faculty_id = request.data['faculty']
                    faculty = Faculty.objects.filter(id=faculty_id)

                    AdminFaculty.objects.create(faculty=faculty[0], user=user)
                    AdminUniversity.objects.filter(user=user).delete()
                except:
                    pass

                try:
                    university_id = request.data['university']
                    university = University.objects.filter(id=university_id)

                    AdminUniversity.objects.create(university=university[0], user=user)
                    AdminFaculty.objects.filter(user=user).delete()
                except:
                    pass

            else:
                data['currentItemCount'] = 0

                data['error'] = {"code": "403", "message": "Client does not have sufficient permission.",
                                 "status": "PERMISSION_DENIED"}

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
            decoded_payload = utils.jwt_decode_handler(
                request.META.get('HTTP_AUTHORIZATION').strip().split("JWT ")[1])
            user_isadmin = User.objects.filter(id=decoded_payload['user_id'])[0].is_admin

            if (user_isadmin):
                try:
                    user = User.objects.create(username=request.data['username'], email=request.data['email'])

                    try:
                        user.first_name = request.data['first_name']
                    except:
                        pass
                    try:
                        user.last_name = request.data['last_name']
                    except:
                        pass
                    try:
                        user.set_password(request.data['newPassword'])
                    except:
                        pass



                    user.save()

                    try:
                        faculty_id = request.data['faculty']
                        faculty = Faculty.objects.filter(id=faculty_id)

                        AdminFaculty.objects.create(faculty=faculty[0], user=user)
                        AdminUniversity.objects.filter(user=user).delete()
                    except:
                        pass

                    try:
                        university_id = request.data['university']
                        university = University.objects.filter(id=university_id)

                        AdminUniversity.objects.create(university=university[0], user=user)
                        AdminFaculty.objects.filter(user=user).delete()
                    except:
                        pass

                    user_data = {'id': user.id, 'first_name': user.first_name, 'last_name': user.last_name,
                                 'username': user.username, 'email': user.email}

                    users_list.append(user_data)
                    data['currentItemCount'] = 1
                except:
                    data['error'] = {"code": "409", "message": "The resource that a client tried to create already exists.",
                                     "status": "ALREADY_EXISTS"}
                    data['currentItemCount'] = 0

            else:
                data['currentItemCount'] = 0
                data['error'] = {"code": "403", "message": "Client does not have sufficient permission.",
                                 "status": "PERMISSION_DENIED"}
        except (IndexError, AttributeError) as e:
            data['currentItemCount'] = 0

        data['items'] = users_list
        result['data'] = data

        return Response(result)

    def delete(self, request, user_id):
        try:
            decoded_payload = utils.jwt_decode_handler(
                request.META.get('HTTP_AUTHORIZATION').strip().split("JWT ")[1])
            user_isadmin = User.objects.filter(id=decoded_payload['user_id'])[0].is_admin

            if (user_isadmin):
                User.objects.filter(id=user_id).delete()
        except (IndexError, AttributeError) as e:
            pass

        return Response()


@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
class UserViewCourse(APIView):
    def get(self, request, limit=-1, offset=-1):
        query_pairs = request.META['QUERY_STRING'].split('&')

        faculty_id = 0
        university_id = 0
        data = {}
        result = {}
        sortby = 'name'
        sortdirection = 'asc'

        try:
            decoded_payload = utils.jwt_decode_handler(
                request.META.get('HTTP_AUTHORIZATION').strip().split("JWT ")[1])
            user = User.objects.filter(id=decoded_payload['user_id'])[0]

            for query_pair in query_pairs:
                query_pair_split = query_pair.split('=')
                if query_pair_split[0] == 'limit':
                    limit = int(query_pair_split[1])
                elif query_pair_split[0] == 'offset':
                    offset = int(query_pair_split[1])
                elif query_pair_split[0] == 'sortby' and query_pair_split[1] != 'undefined':
                    sortby = query_pair_split[1]
                elif query_pair_split[0] == 'sortdirection' and query_pair_split[1] != '':
                    sortdirection = query_pair_split[1]

            if (user.is_admin == False):
                try:
                    adminfaculty = AdminFaculty.objects.filter(user_id=user.id)[0]
                    faculty_id = adminfaculty.faculty_id

                    courses = CourseFaculty.objects.filter(faculty_id=faculty_id)
                except:
                    pass

                try:
                    adminuniversity = AdminUniversity.objects.filter(user_id=user.id)[0]
                    university_id = adminuniversity.university_id

                    courses = CourseUniversity.objects.filter(university_id=university_id)
                except:
                    pass

                data = {}
                result = {}
                courses_list = []

                for one_course in courses:
                    course = one_course.course

                    course_data = {'id': course.id, 'name': course.name, 'description': course.description,
                                   'ects': course.ects, 'englishLevel': course.english_level,
                                   'semester': course.semester,
                                   'modified': course.modified, 'created': course.created
                                   }

                    courses_list.append(course_data)

            else:
                courses = Course.objects.all().order_by('name')

                data = {}
                result = {}
                courses_list = []
                for course in courses:
                    course_data = {'id': course.id, 'name': course.name, 'description': course.description,
                                   'ects': course.ects, 'englishLevel': course.english_level,
                                   'semester': course.semester,
                                   'modified': course.modified, 'created': course.created

                                   }

                    courses_list.append(course_data)

            if sortby == 'id':
                if sortdirection == 'asc':
                    courses_list.sort(key=lambda x: x['id'], reverse=False)
                else:
                    courses_list.sort(key=lambda x: x['id'], reverse=True)
            elif sortby == 'modified':
                if sortdirection == 'asc':
                    courses_list.sort(key=lambda x: x['modified'], reverse=False)
                else:
                    courses_list.sort(key=lambda x: x['modified'], reverse=True)

            else:
                if sortdirection == 'asc':
                    courses_list.sort(key=lambda x: x['name'], reverse=False)
                else:
                    courses_list.sort(key=lambda x: x['name'], reverse=True)

            if limit > 0 and offset >= 0:
                data['currentItemCount'] = limit
                data['items'] = courses_list[offset:offset + limit]
            elif limit > 0:
                data['currentItemCount'] = limit
                data['items'] = courses_list[0:limit]
            elif offset >= 0:
                count = len(courses_list)
                data['currentItemCount'] = count
                data['items'] = courses_list[offset:count]
            else:
                data['currentItemCount'] = len(courses_list)
                data['items'] = courses_list

            result['data'] = data
            return Response(result)

        except:
            result = {}
            result['data'] = []
            return Response(result)

@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
class UserCheckView(APIView):
    def get(self, request):
        data = {}
        result = {}

        try:
            decoded_payload = utils.jwt_decode_handler(
                request.META.get('HTTP_AUTHORIZATION').strip().split("JWT ")[1])
            user = User.objects.filter(id=decoded_payload['user_id'])[0]
            data['admin'] = user.is_admin
            result['data'] = data
            return Response(result)

        except:
            result['data'] = []
            return Response(result)


@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
class UserCheckCourseView(APIView):
    def get(self, request, course_id=-1):
        data = {}
        result = {}

        try:
            decoded_payload = utils.jwt_decode_handler(
                request.META.get('HTTP_AUTHORIZATION').strip().split("JWT ")[1])
            user = User.objects.filter(id=decoded_payload['user_id'])[0]
            allow_access = False

            if (user.is_admin):
                allow_access = True

            else:
                faculty_id = 0
                university_id = 0

                try:
                    coursefaculty = CourseFaculty.objects.filter(course_id=course_id)[0]
                    faculty_id = coursefaculty.faculty_id
                except:
                    pass

                try:
                    courseuniversity = CourseUniversity.objects.filter(course_id=course_id)[0]
                    university_id = courseuniversity.university_id
                except:
                    pass

                if (faculty_id > 0):
                    try:
                        adminfaculty = AdminFaculty.objects.filter(user_id=user.id)[0]

                        if (adminfaculty.faculty_id == faculty_id):
                            allow_access = True
                    except:
                        pass

                if (university_id > 0):
                    try:
                        adminuniversity = AdminUniversity.objects.filter(user_id=user.id)[0]
                        if (adminuniversity.university_id == university_id):
                            allow_access = True
                    except:
                        pass

            data['admin'] = allow_access
            result['data'] = data
            return Response(result)

        except:
            result['data'] = []
            return Response(result)