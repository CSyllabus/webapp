from django.test import TestCase, Client
from ...models import Country
import json


class CountryViewTestCase(TestCase):
    def test_post(self):
        country1 = Country.objects.create(name="Italy")

        c = Client()
        country = {'modified': '2017-12-07',
                   'created': '2017-12-07',
                   'id': country1.id+1,
                   'img': None,
                   'name': 'Sweden'
                  }
        response = c.post('/csyllabusapi/country', json.dumps(country), 'application/json')

        countryName = Country.objects.get(id=country1.id+1).name

        self.assertEqual(response.status_code, 200)
        self.assertEqual(countryName, "Sweden")

    def delete(self):
        # TODO complete function body
        Country.objects.create()       # stub

    def test_put(self):
        country1 = Country.objects.create(name="Croaty")

        c = Client()
        response = c.put('/csyllabusapi/country',
                         '{"id": ' + str(country1.id) + ', "name": "Croatia"}',
                         'application/json')

        countryName = Country.objects.get(id=country1.id).name

        self.assertEqual(response.status_code, 200)
        self.assertEqual(countryName, "Croatia")