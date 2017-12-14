from django.test import TestCase, Client
from django.core.exceptions import ObjectDoesNotExist
import json
from ...models import Country, City, University, Course, Program, CourseProgram, ProgramCountry, ProgramCity, 
                      ProgramUniversity, Faculty, ProgramFaculty


class CourseViewTestCase(TestCase):
    def test_getbyprogramuniversity(self):
        country1 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name='Zagreb', country=country1)
        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        program1 = Program.objects.create(name="Data science", study_level="Postgraduate")
        course1 = Course.objects.create(name="Data bases 2")
        course2 = Course.objects.create(name="Data mining")
        ProgramCountry.objects.create(program=program1, country=country1)
        ProgramCity.objects.create(program=program1, city=city1)
        ProgramUniversity.objects.create(program=program1, university=university1)
        CourseProgram.objects.create(course=course1, program=program1)
        CourseProgram.objects.create(course=course2, program=program1)

        c = Client()

        response = c.get('/csyllabusapi/courses')
        arrCourses = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrCourses.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrCourses, ["Data bases 2", "Data mining"])

    def test_getbyprogramfaculty(self):
        country1 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name='Zagreb', country=country1)
        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        faculty1 = Faculty.objects.create(name='Faculty of electrical engineering and computing',
                                          university=university1,
                                          city=city1)
        
        program1 = Program.objects.create(name="Data science", study_level="Postgraduate")
        course1 = Course.objects.create(name="Data bases 2")
        course2 = Course.objects.create(name="Data mining")
        ProgramCountry.objects.create(program=program1, country=country1)
        ProgramCity.objects.create(program=program1, city=city1)
        ProgramUniversity.objects.create(program=program1, university=university1)

        ProgramFaculty.objects.create(program=program1, faculty=faculty1)

        CourseProgram.objects.create(course=course1, program=program1)
        CourseProgram.objects.create(course=course2, program=program1)

        c = Client()

        response = c.get('/csyllabusapi/courses')
        arrCourses = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrCourses.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrCourses, ["Data bases 2", "Data mining"])

    def test_getwithcourseid(self):
        country1 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name='Zagreb', country=country1)
        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        faculty1 = Faculty.objects.create(name='Faculty of electrical engineering and computing',
                                          university=university1,
                                          city=city1)
        program1 = Program.objects.create(name="Data science", study_level="Postgraduate")
        course1 = Course.objects.create(name="Data bases 2")
        ProgramCountry.objects.create(program=program1, country=country1)
        ProgramCity.objects.create(program=program1, city=city1)
        ProgramUniversity.objects.create(program=program1, university=university1)
        ProgramFaculty.objects.create(program=program1, faculty=faculty1)
        CourseProgram.objects.create(course=course1, program=program1)

        c = Client()

        response = c.get('/csyllabusapi/courses/' + str(course1.id))
        arrCourses = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrCourses.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrCourses, ["Data bases 2"])


    def test_post(self):
        course1 = Course.objects.create(name="Data bases 2")

        c = Client()
        course = {
                  'id': course1.id + 1,
                  'name': 'Recommender systems',
                  'Description': None,
                  'ects': 5,
                  'english_level': None,
                  'semester': 1,
                  'winsum': None,
                  'created': '2017-12-07',
                  'modified': '2017-12-07'
                  }
        response = c.post('/csyllabusapi/courses', json.dumps(course), 'application/json')

        courseName = Course.objects.get(id=course1.id + 1).name

        self.assertEqual(response.status_code, 200)
        self.assertEqual(courseName, "Recommender systems")

    def test_delete(self):
        course1 = Course.objects.create(name="Data bases 2", description="", ects=5, english_level="", semester=1,
                                        winsum="")

        c = Client()
        course = {
            'id': course1.id,
            'name': course1.name,
            'Description': course1.description,
            'ects': course1.ects,
            'english_level': course1.english_level,
            'semester': course1.semester,
            'winsum': course1.winsum,
            'created': str(course1.created),
            'modified': str(course1.modified)
        }
        response = c.delete('/csyllabusapi/courses', json.dumps(course), 'application/json')

        try:
            courseName = Course.objects.get(id=course1.id).name
        except ObjectDoesNotExist:
            courseName = None

        self.assertEqual(response.status_code, 200)
        self.assertEqual(courseName, None)

    def test_put(self):
        course1 = Course.objects.create(name="Data sciences")

        c = Client()
        course = {'id': course1.id,
                  'name': 'Data science'
                  }
        response = c.put('/csyllabusapi/courses', json.dumps(course), 'application/json')

        courseName = Course.objects.get(id=course1.id).name

        self.assertEqual(response.status_code, 200)
        self.assertEqual(courseName, "Data science")


class CourseByProgramViewTestCase(TestCase):
    def test_get(self):
        course1 = Course.objects.create(name='Data bases 2')
        course2 = Course.objects.create(name='Recommender systems')

        program1 = Program.objects.create(name='Computer science and engineering')

        CourseProgram.objects.create(course=course1, program=program1)
        CourseProgram.objects.create(course=course2, program=program1)

        c = Client()
        response = c.get('/csyllabusapi/programs/' + str(program1.id) + '/courses')

        arrCourses = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrCourses.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrCourses, ["Data bases 2", "Recommender systems"])