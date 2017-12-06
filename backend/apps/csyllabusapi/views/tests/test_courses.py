from django.test import TestCase, Client
from .. import CourseView, CourseByProgramView


class CourseViewTestCase(TestCase):
    def test_get(self):
        c = Client()
        response = c.get('/csyllabusapi/courses/1')

        self.assertEqual(response.status_code, 200)

    def post(self):
        # TODO complete function body
        CourseView.objects.create()       # stub

    def delete(self):
        # TODO complete function body
        CourseView.objects.create()       # stub

    def put(self):
        # TODO complete function body
        CourseView.objects.create()       # stub


class CourseByProgramViewTestCase(TestCase):
    def test_get(self):
        c = Client()
        response = c.get('/csyllabusapi/programs/1/courses')

        self.assertEqual(response.status_code, 200)