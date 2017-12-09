from django.test import TestCase, Client
from django.core.exceptions import ObjectDoesNotExist
import json
from ...models import Country, City, University


class UniversityViewTestCase(TestCase):
    def test_post(self):
        country1 = Country.objects.create(name='Italy')
        city1 = City.objects.create(name='Milano', country=country1)
        university1 = University.objects.create(name='Politecnico di Milano', country=country1, city=city1)

        c = Client()
        university = {
                      'id': university1.id+1,
                      'name': 'Universita degli studi di Milano',
                      'created': '2017-12-07',
                      'modified': '2017-12-07',
                      'country_id': country1.id,
                      'city_id': city1.id,
                      'img': None
                     }
        response = c.post('/csyllabusapi/university', json.dumps(university), 'application/json')

        universityName = University.objects.get(id=university1.id + 1).name

        self.assertEqual(response.status_code, 200)
        self.assertEqual(universityName, "Universita degli studi di Milano")

    def test_delete(self):
        country1 = Country.objects.create(name='Italy')
        city1 = City.objects.create(name='Milano', country=country1)
        university1 = University.objects.create(name='Politecnico di Milano', country=country1, city=city1, img="")

        c = Client()
        university = {
            'id': university1.id,
            'name': university1.name,
            'created': str(university1.created),
            'modified': str(university1.modified),
            'country_id': university1.country_id,
            'city_id': university1.city_id,
            'img': university1.img
        }
        response = c.delete('/csyllabusapi/university', json.dumps(university), 'application/json')

        try:
            universityName = University.objects.get(id=university1.id).name
        except ObjectDoesNotExist:
            universityName = None

        self.assertEqual(response.status_code, 200)
        self.assertEqual(universityName, None)

    def test_put(self):
        country1 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name=' ZAGREB', country=country1)
        university1 = University.objects.create(name='University of Zagrebb', country=country1, city=city1)

        c = Client()
        university = {'id': university1.id,
                      'name': 'University of Zagreb',
                      'country_id': university1.country_id,
                      'city_id': university1.city_id

        }
        response = c.put('/csyllabusapi/university', json.dumps(university), 'application/json')

        universityName = University.objects.get(id=university1.id).name

        self.assertEqual(response.status_code, 200)
        self.assertEqual(universityName, "University of Zagreb")