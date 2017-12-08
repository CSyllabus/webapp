from django.test import TestCase, Client
from ...models import Country, City, University, Faculty, Program, Course, ProgramCountry, ProgramCity, ProgramUniversity, ProgramFaculty, CourseProgram


class ComparatorTestCase(TestCase):
    def get(self):
        country1 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name='Zagreb', country=country1)
        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        program1 = Program.objects.create(name='Data science', study_level='Postgraduate')
        course1 = Course.objects.create(name='Data bases 2')
        ProgramCountry.objects.create(program=program1, country=country1)
        ProgramCity.objects.create(program=program1, city=city1)
        ProgramUniversity.objects.create(program=program1, university=university1)
        CourseProgram.objects.create(course=course1, program=program1)

        country2 = Country.objects.create(name='Italy')
        city2 = City.objects.create(name='Milano', country=country2)
        university2 = University.objects.create(name='Politecnico di Milano', country=country2, city=city2)
        program2 = Program.objects.create(name='Computer science and engineering', study_level='Postgraduate')
        course2 = Course.objects.create(name='Data mining')
        ProgramCountry.objects.create(program=program2, country=country2)
        ProgramCity.objects.create(program=program2, city=city2)
        ProgramUniversity.objects.create(program=program2, university=university2)
        CourseProgram.objects.create(course=course2, program=program2)

        c = Client()
        response = c.get('/csyllabusapi/comparator?course=' + str(course1.id) + '&country_id=' + str(country2.id)
                         + '&city_id=' + str(city2.id) + '&university_id=' + str(university2.id))
        print(response.data)

        self.assertEqual(response.status_code, 200)