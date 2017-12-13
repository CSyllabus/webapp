from django.test import TestCase, Client
from ...models import Country, City
from django.core.exceptions import ObjectDoesNotExist
import json
from django.utils import timezone


class CityViewTestCase(TestCase):
    def test_post(self):
        country1 = Country.objects.create(name="Italy")
        city1 = City.objects.create(name="Roma", country=country1)

        c = Client()
        city = {'name': 'Torino',
                'img': None,
                'created': str(timezone.now()),
                'country_id': country1.id,
                'modified': str(timezone.now()),
                'id': city1.id+1
                }
        response = c.post('/csyllabusapi/city', json.dumps(city), 'application/json')

        cityName = City.objects.get(id=city1.id+1).name

        self.assertEqual(response.status_code, 200)
        self.assertEqual(cityName, "Torino")

    def test_delete(self):
        country1 = Country.objects.create(name="Italy")
        city1 = City.objects.create(name="Roma", country=country1, img="")

        c = Client()
        city = {'name': city1.name,
                'img': city1.img,
                'created': str(city1.created),
                'country_id': city1.country_id,
                'modified': str(city1.modified),
                'id': city1.id
                }

        response = c.delete('/csyllabusapi/city', json.dumps(city), 'application/json')

        try:
            cityName = City.objects.get(id=city1.id).name
        except ObjectDoesNotExist:
            cityName = None

        self.assertEqual(response.status_code, 200)
        self.assertEqual(cityName, None)

    def test_put(self):
        country1 = Country.objects.create(name="Croatia")
        city1 = City.objects.create(name=" ZAGREB", country=country1)

        city = {'id': city1.id,
                'name': 'Zagreb',
                'country_id': country1.id
                }

        c = Client()
        response = c.put('/csyllabusapi/city', json.dumps(city), 'application/json')

        cityName = City.objects.get(id=city1.id).name

        self.assertEqual(response.status_code, 200)
        self.assertEqual(cityName, "Zagreb")

