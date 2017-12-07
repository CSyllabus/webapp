from django.test import TestCase, Client
from ...models import Country, City, University, Faculty, Program, ProgramFaculty, ProgramUniversity


class ProgramViewTestCase(TestCase):
    def test_get(self):
        country1 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name='Zagreb', country=country1)
        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        faculty1 = Faculty.objects.create(name='Faculty of electrical engineering and computing',
                                          university=university1, city=city1)
        program1 = Program.objects.create(name="Electrical engineering", study_level="Undergraduate")
        program2 = Program.objects.create(name="Computing infrastructures", study_level="Undergraduate")
        ProgramFaculty.objects.create(faculty=faculty1, program=program1)
        ProgramFaculty.objects.create(faculty=faculty1, program=program2)

        c = Client()
        response = c.get('/csyllabusapi/faculties/' + str(faculty1.id) + '/programs')

        arrPrograms = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrPrograms.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrPrograms, ["Computing infrastructures - Undergraduate",
                                       "Electrical engineering - Undergraduate"])


class ProgramUnivViewTestCase(TestCase):
    def test_get(self):
        country1 = Country.objects.create(name='Italy')
        city1 = City.objects.create(name='Milano', country=country1)
        university1 = University.objects.create(name='Politecnico di Milano', country=country1, city=city1)
        program1 = Program.objects.create(name="Electrical engineering", study_level="Undergraduate")
        program2 = Program.objects.create(name="Computing infrastructures", study_level="Undergraduate")
        ProgramUniversity.objects.create(university=university1, program=program1)
        ProgramUniversity.objects.create(university=university1, program=program2)

        c = Client()
        response = c.get('/csyllabusapi/universities/' + str(university1.id) + '/programs')

        arrPrograms = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrPrograms.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrPrograms, ["Computing infrastructures - Undergraduate",
                                       "Electrical engineering - Undergraduate"])