from django.test import TestCase
from .. import Country

class CountryTestCase(TestCase):
    def test_initcountry(self):
        Country.objects.create(name="Italy")
        Country.objects.create(name="Ireland")
        Country.objects.create(name="Croatia")

        countries = Country.objects.filter(name__startswith="I")

        arrCountries = []
        for country in countries:
            arrCountries.append(Country.objects.get(id=country.id).name)

        self.assertEqual(arrCountries, ["Italy", "Ireland"])

    def test_strcity(self):
        country1 = Country.objects.create(name="Italy")

        self.assertEqual(str(country1), country1.name)