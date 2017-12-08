from django.test import TestCase, Client
from ...models import Country, City, University, Faculty, Course, Program, ProgramCountry, ProgramCity, \
                      ProgramUniversity, ProgramFaculty, CourseProgram


class ExplorerTestCase(TestCase):
    def test_get(self):
        country1 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name='Zagreb', country=country1)
        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        faculty1 = Faculty.objects.create(name='Faculty of electrical engineering and computing',
                                          university=university1, city=city1)
        program1 = Program.objects.create(name='Computer science and engineering')
        course1 = Course.objects.create(name="Java")
        ProgramCountry.objects.create(program=program1, country=country1)
        ProgramCity.objects.create(program=program1, city=city1)
        ProgramUniversity.objects.create(program=program1, university=university1)
        ProgramFaculty.objects.create(program=program1, faculty=faculty1)
        CourseProgram.objects.create(course=course1, program=program1)

        c = Client()
        response = c.get('/csyllabusapi/explorer?keywords=java&country_id=' + str(country1.id) + '&city_id='
                         + str(city1.id) + '&university_id=' + str(university1.id) + '&faculty_id=' + str(faculty1.id))

        arrCourses = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrCourses.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrCourses, ["Java"])