from django.test import TestCase, Client
from .. import ProgramView, ProgramUnivView


class ProgramViewTestCase(TestCase):
    def test_get(self):
        c = Client()
        response = c.get('/csyllabusapi/faculties/1/programs')

        self.assertEqual(response.status_code, 200)


class ProgramUnivViewTestCase(TestCase):
    def test_get(self):
        c = Client()
        response = c.get('/csyllabusapi/universities/1/programs')

        self.assertEqual(response.status_code, 200)