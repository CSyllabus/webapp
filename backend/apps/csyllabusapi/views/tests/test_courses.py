from django.test import TestCase, Client
import json
from ...models import Course, Program, CourseProgram


class CourseViewTestCase(TestCase):
    def get(self):
        course1 = Course.objects.create(name="Data bases 2")

        c = Client()
        response = c.get('/csyllabusapi/courses')

        self.assertEqual(response.status_code, 200)

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

    def delete(self):
        # TODO complete function body
        Course.objects.create()       # stub

    def put(self):
        # TODO complete function body
        Course.objects.create()       # stub


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