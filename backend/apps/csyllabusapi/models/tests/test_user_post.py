from django.test import TestCase
from .. import Course, UserCoursePost, Country, City, University, Faculty, UserFacultyPost

class UserPostTestCase(TestCase):
    def test_contentbycourse(self):
        course1 = Course.objects.create(name="Distributed software development")
        course2 = Course.objects.create(name="Data bases 2")

        UserCoursePost.objects.create(content="Very nice course", course=course1)
        UserCoursePost.objects.create(content="Great teachers", course=course1)
        UserCoursePost.objects.create(content="Impossible to understand", course=course2)
        UserCoursePost.objects.create(content="Good explanations", course=course2)

        contentsDSD = UserCoursePost.objects.filter(course=course1)
        contentsDB2 = UserCoursePost.objects.filter(course=course2)

        arrDSD = []
        arrDB2 = []
        for userCourse in contentsDSD:
            arrDSD.append(UserCoursePost.objects.get(id=userCourse.id).content)
        for userCourse in contentsDB2:
            arrDB2.append(UserCoursePost.objects.get(id=userCourse.id).content)

        self.assertEqual(arrDSD, ["Great teachers", "Very nice course"])
        self.assertEqual(arrDB2, ["Good explanations", "Impossible to understand"])

    def test_strusercourse(self):
        course1 = Course.objects.create(name="Distributed software development")
        usercourse1 = UserCoursePost.objects.create(content="Very nice course", course=course1)

        self.assertEqual(str(usercourse1), str(usercourse1.content) + " " + str(usercourse1.course))

    def test_userbyfaculty(self):
        country1 = Country.objects.create(name='Croatia')
        country2 = Country.objects.create(name='Italy')

        city1 = City.objects.create(name='Zagreb', country=country1)
        city2 = City.objects.create(name='Milano', country=country2)

        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        university2 = University.objects.create(name='Politecnico di Milano', country=country2, city=city2)

        faculty1 = Faculty.objects.create(name='Faculty of electrical engineering and computing',
                                          university=university1, city=city1)
        faculty2 = Faculty.objects.create(name='Faculty of computer science and telecommunications engineering',
                                          university=university2, city=city2)

        UserFacultyPost.objects.create(content="Very nice location", faculty=faculty1)
        UserFacultyPost.objects.create(content="Great teachers", faculty=faculty1)
        UserFacultyPost.objects.create(content="Bad staff", faculty=faculty2)
        UserFacultyPost.objects.create(content="Good staff", faculty=faculty2)

        contentsFer = UserFacultyPost.objects.filter(faculty=faculty1)
        contentsFct = UserFacultyPost.objects.filter(faculty=faculty2)

        arrFer = []
        arrFct = []
        for userFaculty in contentsFer:
            arrFer.append(UserFacultyPost.objects.get(id=userFaculty.id).content)
        for userFaculty in contentsFct:
            arrFct.append(UserFacultyPost.objects.get(id=userFaculty.id).content)

        self.assertEqual(arrFer, ["Great teachers", "Very nice location"])

        self.assertEqual(arrFct, ["Good staff", "Bad staff"])

    def test_struserfaculty(self):
        country1 = Country.objects.create(name='Italy')
        city1 = City.objects.create(name='Milano', country=country1)
        university1 = University.objects.create(name='Politecnico di Milano', country=country1, city=city1)
        faculty1 = Faculty.objects.create(name='Faculty of computer science and telecommunications engineering',
                                          university=university1, city=city1)
        userfaculty1 = UserFacultyPost.objects.create(content="Very nice location", faculty=faculty1)

        self.assertEqual(str(userfaculty1), str(userfaculty1.content) + " " + str(userfaculty1.faculty))

