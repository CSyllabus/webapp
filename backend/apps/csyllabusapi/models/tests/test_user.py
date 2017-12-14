from django.test import TestCase
from .. import User, Country, City, University, Faculty, UserFaculty, Course, TeacherCourse

class UserTestCase(TestCase):
    def test_inituser(self):
        User.objects.create(username="guber", password="none", first_name="Emanuel", last_name="Guberovic",
                            email="guber@csyllabus.com")
        User.objects.create(username="tbenetti", password="none", first_name="Thomas", last_name="Benetti",
                            email="tbenetti@csyllabus.com")
        User.objects.create(username="filipt", password="none", first_name="Filip", last_name="Turcinovic",
                            email="filipt@csyllabus.com")

        users = User.objects.filter(last_name__endswith="vic")

        arrUsers = []
        for user in users:
            arrUsers.append(User.objects.get(id=user.id).username)

        self.assertEqual(arrUsers, ["guber", "filipt"])

    def test_struser(self):
        user1 = User.objects.create(username="guber", password="none", first_name="Emanuel", last_name="Guberovic",
                                    email="guber@csyllabus.com")

        self.assertEqual(str(user1), str(user1.username))

    def test_userbyfaculty(self):

        user1 = User.objects.create(username="adri", password="none", first_name="Adrien", last_name="Roques",
                                    email="adri@csyllabus.com")
        user2 = User.objects.create(username="smayoral", password="none", first_name="Sebastian", last_name="Mayoral",
                                    email="smayoral@csyllabus.com")
        user3 = User.objects.create(username="zvone", password="none", first_name="Zvonimir", last_name="Relja",
                                    email="zvone@csyllabus.com")
        user4 = User.objects.create(username="mvukosav", password="none", first_name="Matej", last_name="Vukosav",
                                    email="mvukosav@csyllabus.com")

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

    def test_struserfaculty(self):
        user1 = User.objects.create(username="zvone", password="none", first_name="Zvonimir", last_name="Relja",
                                    email="zvone@csyllabus.com")
        country1 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name='Zagreb', country=country1)
        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        faculty1 = Faculty.objects.create(name='Faculty of electrical engineering and computing',
                                          university=university1, city=city1)
        userfaculty1 = UserFaculty.objects.create(user=user1, faculty=faculty1)

        self.assertEqual(str(userfaculty1), str(userfaculty1.user) + " " + str(userfaculty1.faculty))

    def test_teacherbycourse(self):

        user1 = User.objects.create(username="ivana", password="none", first_name="Ivana", last_name="Bosnic",
                                    email="ivana.bosnic@fer.hr")
        user2 = User.objects.create(username="raffaela", password="none", first_name="Raffaela", last_name="Mirandola",
                                    email="raffaela.mirandola@polimi.it")
        user3 = User.objects.create(username="stefano", password="none", first_name="Stefano", last_name="Paraboschi",
                                    email="stefano.paraboschi@polimi.it")
        user4 = User.objects.create(username="daniele", password="none", first_name="Daniele", last_name="Braga",
                                    email="daniele.braga@polimi.it")

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

    def test_strteachercourse(self):
        user1 = User.objects.create(username="raffaela", password="mirandola", first_name="Raffaela",
                                    last_name="Mirandola", email="raffaela.mirandola@polimi.it")
        course1 = Course.objects.create(name="Distributed software development")
        teachercourse1 = TeacherCourse.objects.create(user=user1, course=course1)

        self.assertEqual(str(teachercourse1), str(teachercourse1.user) + " " + str(teachercourse1.course))
