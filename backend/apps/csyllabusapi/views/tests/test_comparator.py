from django.test import TestCase, Client
from ...models import Country, City, University, Course, CourseProgram
from ...models import Program, ProgramCountry, ProgramCity, ProgramUniversity
from ...management.commands import course_similarity
from django.core.management import execute_from_command_line

class ComparatorTestCase(TestCase):
    def test_get(self):
        # creation of first course
        country1 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name='Zagreb', country=country1)
        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        program1 = Program.objects.create(name='Data science', study_level='Postgraduate')
        course1 = Course.objects.create(name='Data bases 2', description='Data bases 2 course')
        ProgramCountry.objects.create(program=program1, country=country1)
        ProgramCity.objects.create(program=program1, city=city1)
        ProgramUniversity.objects.create(program=program1, university=university1)
        CourseProgram.objects.create(course=course1, program=program1)

        # creation of second course
        country2 = Country.objects.create(name='Italy')
        city2 = City.objects.create(name='Milano', country=country2)
        university2 = University.objects.create(name='Politecnico di Milano', country=country2, city=city2)
        program2 = Program.objects.create(name='Computer science and engineering', study_level='Postgraduate')
        course2 = Course.objects.create(name='Data mining', description='Data mining course')
        ProgramCountry.objects.create(program=program2, country=country2)
        ProgramCity.objects.create(program=program2, city=city2)
        ProgramUniversity.objects.create(program=program2, university=university2)
        CourseProgram.objects.create(course=course2, program=program2)

        # searching for similarities between the courses
        cmd = course_similarity.Command()
        course_similarity.Command.handle(cmd)

        # creation of http get request
        c = Client()
        response = c.get('/csyllabusapi/comparator?course=' + str(course1.id) + '&country_id=' + str(country2.id)
                         + '&city_id=' + str(city2.id) + '&university_id=' + str(university2.id))

        arrCourses = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrCourses.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrCourses, ["Data mining"])