from django.test import TestCase, Client
from ...models import Country, City, University, Faculty


class ExplorerTestCase(TestCase):
    def test_get(self):
        country1 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name='Zagreb', country=country1)
        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        faculty1 = Faculty.objects.create(name='Faculty of electrical engineering and computing',
                                          university=university1, city=city1)

        c = Client()
        response = c.get('/csyllabusapi/explorer?keywords=java&country_id=' + str(country1.id) + '&city_id='
                         + str(city1.id) + '&university_id=' + str(university1.id) + '&faculty_id=' + str(faculty1.id))

        self.assertEqual(response.status_code, 200)