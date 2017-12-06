from django.test import TestCase, Client
from .. import UniversitiesViewAll, UniversitiesView


class UniversitiesViewAllTestCase(TestCase):
    def test_get(self):
        c = Client()
        response = c.get('/csyllabusapi/universitiesall')

        self.assertEqual(response.status_code, 200)


class UniversitiesViewTestCase(TestCase):
    def test_get(self):
        c = Client()
        response = c.get('/csyllabusapi/cities/1/universities')

        self.assertEqual(response.status_code, 200)