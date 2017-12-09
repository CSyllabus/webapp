from django.test import TestCase, Client
from .. import FacultyView
from ...models import Country, City, University, Faculty


class FacultyViewTestCase(TestCase):
    def test_get(self):
        country1 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name='Zagreb', country=country1)
        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        Faculty.objects.create(name='Faculty of electrical engineering and computing', university=university1,
                               city=city1)
        Faculty.objects.create(name='Faculty of computer science and engineering', university=university1, city=city1)

        c = Client()
        response = c.get('/csyllabusapi/universities/' + str(university1.id) + '/faculties')

        arrFaculties = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrFaculties.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrFaculties, ["Faculty of computer science and engineering",
                                        "Faculty of electrical engineering and computing"])