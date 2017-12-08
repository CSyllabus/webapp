from django.test import TestCase, Client
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

    def delete(self):
        # TODO complete function body
        University.objects.create()       # stub

    def test_put(self):
        country1 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name=' ZAGREB', country=country1)
        university1 = University.objects.create(name='University of Zagrebb', country=country1, city=city1)

        c = Client()
        response = c.put('/csyllabusapi/university',
                         '{"id": ' + str(university1.id) + ', "name": "University of Zagreb", "country_id": '
                         + str(country1.id) + ', "city_id": ' + str(city1.id) + '}',
                         'application/json')

        universityName = University.objects.get(id=university1.id).name

        self.assertEqual(response.status_code, 200)
        self.assertEqual(universityName, "University of Zagreb")