from django.test import TestCase
from .. import Course, Program, CourseProgram

class CourseTestCase(TestCase):
    def test_initcourse(self):
        Course.objects.create(name='Data bases 2')
        Course.objects.create(name='Recommender systems')
        Course.objects.create(name='Advanced data mining')

        courses = Course.objects.filter(name__icontains="data")

        arrCourses = []
        for course in courses:
            arrCourses.append(Course.objects.get(id=course.id).name)

        self.assertEqual(arrCourses, ["Data bases 2", "Advanced data mining"])

    def test_coursebyprogram(self):
        course1 = Course.objects.create(name='Data bases 2')
        course2 = Course.objects.create(name='Recommender systems')
        course3 = Course.objects.create(name='TCP/IP')
        course4 = Course.objects.create(name='Network supervision')

        program1 = Program.objects.create(name='Computer science and engineering')
        program2 = Program.objects.create(name='Telecommunications engineering')

        CourseProgram.objects.create(course=course1, program=program1)
        CourseProgram.objects.create(course=course2, program=program1)
        CourseProgram.objects.create(course=course3, program=program2)
        CourseProgram.objects.create(course=course4, program=program2)

        computerScienceCourses = CourseProgram.objects.filter(program=program1)
        telecommunicationCourses = CourseProgram.objects.filter(program=program2)

        arrCSCourses = []
        arrTelecCourses = []
        for courseProgram in computerScienceCourses:
            arrCSCourses.append(Course.objects.get(id=courseProgram.course.id).name)
        for courseProgram in telecommunicationCourses:
            arrTelecCourses.append(Course.objects.get(id=courseProgram.course.id).name)

        # check if courses are in the right programs
        self.assertEquals(arrCSCourses, ['Data bases 2', 'Recommender systems'])
        self.assertEqual(arrTelecCourses, ['TCP/IP', 'Network supervision'])