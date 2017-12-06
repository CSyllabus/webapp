from django.test import TestCase, Client
from .. import CountriesView


class CountriesViewTestCase(TestCase):
    def test_get(self):
        c = Client()
        response = c.get('/csyllabusapi/countries')

        self.assertEqual(response.status_code, 200)