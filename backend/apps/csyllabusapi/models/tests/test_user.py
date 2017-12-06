from django.test import TestCase
from .. import User, Country, City, University, Faculty, UserFaculty, Course, TeacherCourse

class UserTestCase(TestCase):
    def test_inituser(self):
        User.objects.create(username="guber", password="none", firstname="Emanuel", lastname="Guberovic")
        User.objects.create(username="tbenetti", password="none", firstname="Thomas", lastname="Benetti")
        User.objects.create(username="filipt", password="none", firstname="Filip", lastname="Turcinovic")

        users = User.objects.filter(lastname__endswith="vic")

        arrUsers = []
        for user in users:
            arrUsers.append(User.objects.get(id=user.id).username)

        self.assertEqual(arrUsers, ["guber", "filipt"])

    def test_usersbyfaculty(self):
        user1 = User.objects.create(username="adri", password="none", firstname="Adrien", lastname="Roques")
        user2 = User.objects.create(username="smayoral", password="none", firstname="Sebastian", lastname="Mayoral")
        user3 = User.objects.create(username="zvone", password="none", firstname="Zvonimir", lastname="Relja")
        user4 = User.objects.create(username="mvukosav", password="none", firstname="Matej", lastname="Vukosav")

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

        UserFaculty.objects.create(user=user1, faculty=faculty2)
        UserFaculty.objects.create(user=user2, faculty=faculty2)
        UserFaculty.objects.create(user=user3, faculty=faculty1)
        UserFaculty.objects.create(user=user4, faculty=faculty1)

        usersFer = UserFaculty.objects.filter(faculty=faculty1)
        usersFct = UserFaculty.objects.filter(faculty=faculty2)

        arrFer = []
        arrFct = []
        for userFaculty in usersFer:
            arrFer.append(User.objects.get(id=userFaculty.user.id).username)
        for userFaculty in usersFct:
            arrFct.append(User.objects.get(id=userFaculty.user.id).username)

        self.assertEqual(arrFer, ["zvone", "mvukosav"])
        self.assertEqual(arrFct, ["adri", "smayoral"])

    def test_teachersbycourse(self):
        user1 = User.objects.create(username="ivana", password="none", firstname="Ivana", lastname="Bosnic")
        user2 = User.objects.create(username="raffaela", password="none", firstname="Raffaela", lastname="Mirandola")
        user3 = User.objects.create(username="stefano", password="none", firstname="Stefano", lastname="Paraboschi")
        user4 = User.objects.create(username="daniele", password="none", firstname="Daniele", lastname="Braga")

        course1 = Course.objects.create(name="Distributed software development")
        course2 = Course.objects.create(name="Data bases 2")

        TeacherCourse.objects.create(user=user1, course=course1)
        TeacherCourse.objects.create(user=user2, course=course1)
        TeacherCourse.objects.create(user=user3, course=course2)
        TeacherCourse.objects.create(user=user4, course=course2)

        teachersDSD = TeacherCourse.objects.filter(course=course1)
        teachersDB2 = TeacherCourse.objects.filter(course=course2)

        arrDSD = []
        arrDB2 = []
        for teacherCourse in teachersDSD:
            arrDSD.append(User.objects.get(id=teacherCourse.user.id).username)
        for teacherCourse in teachersDB2:
            arrDB2.append(User.objects.get(id=teacherCourse.user.id).username)

        self.assertEqual(arrDSD, ["ivana", "raffaela"])
        self.assertEqual(arrDB2, ["stefano", "daniele"])