from django.test import TestCase
from .. import City, Country

class CityTestCase(TestCase):
    def test_initcity(self):
        country1 = Country.objects.create(name="Italy")
        country2 = Country.objects.create(name="Croatia")

        City.objects.create(name="Milano", country=country1)
        City.objects.create(name="L'Aquila", country=country1)
        City.objects.create(name="Zagreb", country=country2)
        City.objects.create(name="Split", country=country2)

        cities = City.objects.filter(name__icontains="a")

        arrCities = []
        for city in cities:
            arrCities.append(City.objects.get(id=city.id).name)

        self.assertEqual(arrCities, ["Milano", "L'Aquila", "Zagreb"])

    def test_citybycountry(self):
        country1 = Country.objects.create(name="Italy")
        country2 = Country.objects.create(name="Croatia")

        City.objects.create(name="Milano", country=country1)
        City.objects.create(name="L'Aquila", country=country1)
        City.objects.create(name="Zagreb", country=country2)
        City.objects.create(name="Split", country=country2)

        italianCities = City.objects.filter(country=country1)
        croatianCities = City.objects.filter(country=country2)

        arrItCities = []
        arrCrCities = []
        for city in italianCities:
            arrItCities.append(City.objects.get(id=city.id).name)
        for city in croatianCities:
            arrCrCities.append(City.objects.get(id=city.id).name)

        # check if cities are in the right countries
        self.assertEqual(arrItCities, ["L'Aquila", "Milano"])
        self.assertEqual(arrCrCities, ["Split", "Zagreb"])

    def test_strcity(self):
        country1 = Country.objects.create(name="Italy")
        city1 = City.objects.create(name="Milano", country=country1)

        self.assertEqual(str(city1), city1.name)
