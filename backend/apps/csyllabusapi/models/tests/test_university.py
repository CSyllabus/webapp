from django.test import TestCase
from .. import Country, City, University

class UniversityTestCase(TestCase):
    def test_inituniversity(self):
        country1 = Country.objects.create(name='Croatia')
        country2 = Country.objects.create(name='Italy')

        city1 = City.objects.create(name='Zagreb', country=country1)
        city2 = City.objects.create(name='Milano', country=country2)
        city3 = City.objects.create(name='Torino', country=country2)

        University.objects.create(name='University of Zagreb', country=country1, city=city1)
        University.objects.create(name='Politecnico di Milano', country=country2, city=city2)
        University.objects.create(name='Politecnico di Torino', country=country2, city=city3)

        universities = University.objects.filter(name__startswith="Politecnico")

        arrUni = []
        for uni in universities:
            arrUni.append(University.objects.get(id=uni.id).name)


        self.assertEqual(arrUni, ["Politecnico di Milano", "Politecnico di Torino"])

    def test_struniversity(self):
        country1 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name='Zagreb', country=country1)
        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)

        self.assertEqual(str(university1), university1.name)