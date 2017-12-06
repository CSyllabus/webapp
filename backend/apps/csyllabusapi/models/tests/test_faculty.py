from django.test import TestCase
from .. import Country, City, University, Faculty

class FacultyTestCase(TestCase):
    def test_initfaculty(self):
        country1 = Country.objects.create(name='Croatia')
        country2 = Country.objects.create(name='Italy')

        city1 = City.objects.create(name='Zagreb', country=country1)
        city2 = City.objects.create(name='Milano', country=country2)

        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        university2 = University.objects.create(name='Politecnico di Milano', country=country2, city=city2)

        Faculty.objects.create(name='Faculty of electrical engineering and computing', university=university1,
                               city=city1)
        Faculty.objects.create(name='Faculty of computer science and engineering', university=university1, city=city1)
        Faculty.objects.create(name='Faculty of design and architecture', university=university2, city=city2)
        Faculty.objects.create(name='Faculty of telecommunications engineering', university=university2, city=city2)

        faculties = Faculty.objects.filter(name__icontains="engineering")

        arrFaculties = []
        for faculty in faculties:
            arrFaculties.append(Faculty.objects.get(id=faculty.id).name)

        self.assertEqual(arrFaculties, ["Faculty of electrical engineering and computing",
                                        "Faculty of computer science and engineering",
                                        "Faculty of telecommunications engineering"])