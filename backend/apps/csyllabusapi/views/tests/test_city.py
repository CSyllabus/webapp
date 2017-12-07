from django.test import TestCase, Client
from ...models import Country, City
from django.utils import timezone
import json


class CityViewTestCase(TestCase):
    def test_post(self):
        country1 = Country.objects.create(name="Italy")
        city1 = City.objects.create(name="Roma", country=country1)

        c = Client()
        city = {'name': 'Torino',
                'img': None,
                'created': '2017-12-07',
                'country_id': country1.id,
                'modified': '2017-12-07',
                'id': city1.id+1
                }
        response = c.post('/csyllabusapi/city', json.dumps(city), 'application/json')

        cityName = City.objects.get(id=city1.id+1).name

        self.assertEqual(response.status_code, 200)
        self.assertEqual(cityName, "Torino")

    def test_delete(self):
        country1 = Country.objects.create(name="Italy")
        city1 = City.objects.create(name="Milano", country=country1)

        c = Client()
        response = c.delete('/csyllabusapi/city/' + str(city1.id))

        self.assertEqual(response.status_code, 200)

    def put(self):
        c = Client()
        response = c.put()