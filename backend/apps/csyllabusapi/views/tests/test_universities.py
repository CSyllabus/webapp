from django.test import TestCase, Client
from ...models import Country, City, University


class UniversitiesViewAllTestCase(TestCase):
    def test_get(self):
        country1 = Country.objects.create(name='Croatia')
        country2 = Country.objects.create(name='Italy')
        city1 = City.objects.create(name='Zagreb', country=country1)
        city2 = City.objects.create(name='Milano', country=country2)
        city3 = City.objects.create(name='Torino', country=country2)
        University.objects.create(name='University of Zagreb', country=country1, city=city1)
        University.objects.create(name='Politecnico di Milano', country=country2, city=city2)
        University.objects.create(name='Politecnico di Torino', country=country2, city=city3)

        c = Client()
        response = c.get('/csyllabusapi/universitiesall')

        arrUni = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrUni.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrUni, ["Politecnico di Milano", "Politecnico di Torino", "University of Zagreb"])


class UniversitiesViewTestCase(TestCase):
    def test_get(self):
        country1 = Country.objects.create(name='Italy')
        city1 = City.objects.create(name='Milano', country=country1)
        University.objects.create(name='Politecnico di Milano', country=country1, city=city1)
        University.objects.create(name='Universita degli studi di Milano', country=country1, city=city1)

        c = Client()
        response = c.get('/csyllabusapi/cities/' + str(city1.id) + '/universities')

        arrUni = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrUni.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrUni, ["Politecnico di Milano", "Universita degli studi di Milano"])

class UniversitiesViewCountryTestCase(TestCase):
    def test_get(self):
        country1 = Country.objects.create(name='Italy')
        city1 = City.objects.create(name='Milano', country=country1)
        University.objects.create(name='Politecnico di Milano', country=country1, city=city1)
        University.objects.create(name='Universita degli studi di Milano', country=country1, city=city1)

        c = Client()
        response = c.get('/csyllabusapi/countries/' + str(country1.id) + '/universities')

        arrUni = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrUni.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrUni, ["Politecnico di Milano", "Universita degli studi di Milano"])