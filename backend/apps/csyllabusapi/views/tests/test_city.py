from django.test import TestCase, Client
from .. import CityView


class CityViewTestCase(TestCase):
    def post(self):
        c = Client()
        response = c.post('/csyllabusapi/city', {"name": "Test", "country_id": 2})

        self.assertEqual(response.status_code, 200)

    def test_delete(self):
        c = Client()
        response = c.delete('/csyllabusapi/city/7')

        self.assertEqual(response.status_code, 200)

    def put(self):
        # TODO complete function body
        CityView.put(CityView(), "")      # stub