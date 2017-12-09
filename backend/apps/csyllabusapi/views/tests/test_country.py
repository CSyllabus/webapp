from django.test import TestCase, Client
from ...models import Country
from django.core.exceptions import ObjectDoesNotExist
import json
from django.utils import timezone


class CountryViewTestCase(TestCase):
    def test_post(self):
        country1 = Country.objects.create(name="Italy")

        c = Client()
        country = {'modified': str(timezone.now()),
                   'created': str(timezone.now()),
                   'id': country1.id+1,
                   'img': None,
                   'name': 'Sweden'
                  }
        response = c.post('/csyllabusapi/country', json.dumps(country), 'application/json')

        countryName = Country.objects.get(id=country1.id+1).name

        self.assertEqual(response.status_code, 200)
        self.assertEqual(countryName, "Sweden")

    def test_delete(self):
        country1 = Country.objects.create(name="Italy", img="")

        c = Client()
        country = {'modified': str(country1.modified),
                   'created': str(country1.created),
                   'id': country1.id,
                   'img': country1.img,
                   'name': country1.name
                   }
        response = c.delete('/csyllabusapi/country', json.dumps(country), 'application/json')

        try:
            countryName = Country.objects.get(id=country1.id + 1).name
        except ObjectDoesNotExist:
            countryName = None

        self.assertEqual(response.status_code, 200)
        self.assertEqual(countryName, None)

    def test_put(self):
        country1 = Country.objects.create(name="Croaty")

        c = Client()
        country = {'id': country1.id,
                   'name': 'Croatia'
                   }
        response = c.put('/csyllabusapi/country', json.dumps(country), 'application/json')

        countryName = Country.objects.get(id=country1.id).name

        self.assertEqual(response.status_code, 200)
        self.assertEqual(countryName, "Croatia")