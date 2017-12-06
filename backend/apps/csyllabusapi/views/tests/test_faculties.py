from django.test import TestCase, Client
from .. import FacultyView


class FacultyViewTestCase(TestCase):
    def test_get(self):
        c = Client()
        response = c.get('/csyllabusapi/universities/1/faculties')

        self.assertEqual(response.status_code, 200)