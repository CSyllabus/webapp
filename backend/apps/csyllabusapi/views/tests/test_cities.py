from django.test import TestCase, Client
from ...models import City, Country

class CitiesViewTestCase(TestCase):
    def test_get(self):
        country1 = Country.objects.create(name="Italy")

        City.objects.create(name="Milano", country=country1)
        City.objects.create(name="L'Aquila", country=country1)

        c = Client()
        response = c.get('/csyllabusapi/countries/' + str(country1.id) + '/cities')

        arrCities = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrCities.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrCities, ["L'Aquila", "Milano"])