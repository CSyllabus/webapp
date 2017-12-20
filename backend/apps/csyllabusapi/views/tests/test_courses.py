from django.test import TestCase, Client
from django.core.exceptions import ObjectDoesNotExist
import json
from django.utils import timezone
from ...models import Country, City, University, Course, Program, CourseProgram, ProgramCountry, ProgramCity, \
    ProgramUniversity, Faculty, ProgramFaculty, CourseFaculty, CourseUniversity


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
                  'description': None,
                  'ects': 5,
                  'english_level': None,
                  'semester': 1,
                  'level': None,
                  'url': None,
                  'created': str(timezone.now()),
                  'modified': str(timezone.now())
                  }
        response = c.post('/csyllabusapi/courses', json.dumps(course), 'application/json')

        courseName = Course.objects.get(id=course1.id + 1).name

        self.assertEqual(response.status_code, 200)
        self.assertEqual(courseName, "Recommender systems")

    def test_delete(self):
        course1 = Course.objects.create(name="Data bases 2", description="", ects=5, english_level="", semester=1)

        c = Client()
        course = {
            'id': course1.id,
            'name': course1.name,
            'description': course1.description,
            'ects': course1.ects,
            'english_level': course1.english_level,
            'semester': course1.semester,
            'level': course1.level,
            'url': course1.url,
            'keywords': course1.keywords,
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
                  'name': 'Data science',
                  'description': 'Data science course',
                  'level': '1',
                  'englishLevel': '1',
                  'semester': 1,
                  'ects': 5,
                  'keywords': 'data'
                  }
        response = c.put('/csyllabusapi/courses/' + str(course1.id) + '/', json.dumps(course), 'application/json')

        courseName = Course.objects.get(id=course1.id).name

        self.assertEqual(response.status_code, 200)
        self.assertEqual(courseName, "Data science")

    def test_putnoattributes(self):
        course1 = Course.objects.create(name="Data science")

        c = Client()
        course = {'id': course1.id
                  }
        response = c.put('/csyllabusapi/courses/' + str(course1.id) + '/', json.dumps(course), 'application/json')

        courseName = Course.objects.get(id=course1.id).name

        self.assertEqual(response.status_code, 200)
        self.assertEqual(courseName, "Data science")

    def test_putindexerror(self):

        c = Client()
        course = {'id': 0
                  }
        response = c.put('/csyllabusapi/courses/0/', json.dumps(course), 'application/json')

        self.assertEqual(response.status_code, 200)


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


class CourseByFacultyViewTestCase(TestCase):
    def test_get(self):
        country1 = Country.objects.create(name='Italy')
        city1 = City.objects.create(name='Milano', country=country1)
        university1 = University.objects.create(name='Politecnico di Milano', country=country1, city=city1)
        faculty1 = Faculty.objects.create(name='Faculty of computer science and engineering', university=university1,
                                          city=city1)

        course1 = Course.objects.create(name='Data bases 2')
        course2 = Course.objects.create(name='Recommender systems')

        CourseFaculty.objects.create(course=course1, faculty=faculty1)
        CourseFaculty.objects.create(course=course2, faculty=faculty1)

        c = Client()
        response = c.get('/csyllabusapi/faculties/' + str(faculty1.id) + '/courses')

        arrCourses = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrCourses.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrCourses, ["Data bases 2", "Recommender systems"])


class CourseByUniversityViewTestCase(TestCase):
    def test_get(self):
        country1 = Country.objects.create(name='Italy')
        city1 = City.objects.create(name='Milano', country=country1)
        university1 = University.objects.create(name='Politecnico di Milano', country=country1, city=city1)

        course1 = Course.objects.create(name='Data bases 2')
        course2 = Course.objects.create(name='Recommender systems')

        CourseUniversity.objects.create(course=course1, university=university1)
        CourseUniversity.objects.create(course=course2, university=university1)

        c = Client()
        response = c.get('/csyllabusapi/universities/' + str(university1.id) + '/courses')

        arrCourses = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrCourses.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrCourses, ["Data bases 2", "Recommender systems"])