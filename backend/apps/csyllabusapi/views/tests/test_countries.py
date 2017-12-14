from django.test import TestCase, Client
from ...models import Country


class CountriesViewTestCase(TestCase):
    def test_get(self):
        Country.objects.create(name="Italy")
        Country.objects.create(name="Croatia")

        c = Client()
        response = c.get('/csyllabusapi/countries')

        arrCountries = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrCountries.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrCountries, ["Croatia", "Italy"])