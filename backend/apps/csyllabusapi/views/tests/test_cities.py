from django.test import TestCase, Client
from .. import CitiesView


class CitiesViewTestCase(TestCase):
    def test_get(self):
        c = Client()
        response = c.get('/csyllabusapi/countries/2/cities')

        self.assertEqual(response.status_code, 200)