from django.test import TestCase
from .. import Country, City, University, Faculty, Course, Program, CourseProgram, CourseUniversity, CourseFaculty

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

    def test_strcourse(self):
        course1 = Course.objects.create(name='Data bases 2')

        self.assertEqual(str(course1), course1.name)

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

    def test_coursebyuniversity(self):
        country1 = Country.objects.create(name='Italy')
        country2 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name='Milano', country=country1)
        city2 = City.objects.create(name='Zagreb', country=country2)
        university1 = University.objects.create(name='Politecnico di Milano', country=country1, city=city1)
        university2 = University.objects.create(name='University of Zagreb', country=country2, city=city2)

        course1 = Course.objects.create(name='Data bases 2')
        course2 = Course.objects.create(name='Recommender systems')
        course3 = Course.objects.create(name='TCP/IP')
        course4 = Course.objects.create(name='Network supervision')

        CourseUniversity.objects.create(course=course1, university=university1)
        CourseUniversity.objects.create(course=course2, university=university1)
        CourseUniversity.objects.create(course=course3, university=university2)
        CourseUniversity.objects.create(course=course4, university=university2)

        polimiCourses = CourseUniversity.objects.filter(university=university1)
        zagrebCourses = CourseUniversity.objects.filter(university=university2)

        arrPolimi = []
        arrZagreb = []
        for courseUniversity in polimiCourses:
            arrPolimi.append(Course.objects.get(id=courseUniversity.course.id).name)
        for courseUniversity in zagrebCourses:
            arrZagreb.append(Course.objects.get(id=courseUniversity.course.id).name)

        # check if courses are in the right programs
        self.assertEquals(arrPolimi, ['Data bases 2', 'Recommender systems'])
        self.assertEqual(arrZagreb, ['TCP/IP', 'Network supervision'])

    def test_coursebyfaculty(self):
        country1 = Country.objects.create(name='Italy')
        country2 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name='Milano', country=country1)
        city2 = City.objects.create(name='Zagreb', country=country2)
        university1 = University.objects.create(name='Politecnico di Milano', country=country1, city=city1)
        university2 = University.objects.create(name='University of Zagreb', country=country2, city=city2)
        faculty1 = Faculty.objects.create(name='Faculty of computer science', university=university1, city=city1)
        faculty2 = Faculty.objects.create(name='Faculty of electrical engineering and computing',
                                          university=university2, city=city2)

        course1 = Course.objects.create(name='Data bases 2')
        course2 = Course.objects.create(name='Recommender systems')
        course3 = Course.objects.create(name='TCP/IP')
        course4 = Course.objects.create(name='Network supervision')

        CourseFaculty.objects.create(course=course1, faculty=faculty1)
        CourseFaculty.objects.create(course=course2, faculty=faculty1)
        CourseFaculty.objects.create(course=course3, faculty=faculty2)
        CourseFaculty.objects.create(course=course4, faculty=faculty2)

        fcsCourses = CourseFaculty.objects.filter(faculty=faculty1)
        ferCourses = CourseFaculty.objects.filter(faculty=faculty2)

        arrFcs = []
        arrFer = []
        for courseFaculty in fcsCourses:
            arrFcs.append(Course.objects.get(id=courseFaculty.course.id).name)
        for courseFaculty in ferCourses:
            arrFer.append(Course.objects.get(id=courseFaculty.course.id).name)

        # check if courses are in the right programs
        self.assertEquals(arrFcs, ['Data bases 2', 'Recommender systems'])
        self.assertEqual(arrFer, ['TCP/IP', 'Network supervision'])