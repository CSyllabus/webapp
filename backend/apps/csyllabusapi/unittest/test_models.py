from django.test import TestCase
from ..models import *


class CityTestCase(TestCase):
    def test_initcities(self):
        country1 = Country.objects.create(name="Italy")
        country2 = Country.objects.create(name="Croatia")

        City.objects.create(name="Milano", country=country1)
        City.objects.create(name="L'Aquila", country=country1)
        City.objects.create(name="Zagreb", country=country2)
        City.objects.create(name="Split", country=country2)

        cities = City.objects.filter(name__icontains="a")

        arrCities = []
        for city in cities:
            arrCities.append(City.objects.get(id=city.id).name)

        self.assertEqual(arrCities, ["Milano", "L'Aquila", "Zagreb"])

    def test_citiesbycountry(self):
        country1 = Country.objects.create(name="Italy")
        country2 = Country.objects.create(name="Croatia")

        City.objects.create(name="Milano", country=country1)
        City.objects.create(name="L'Aquila", country=country1)
        City.objects.create(name="Zagreb", country=country2)
        City.objects.create(name="Split", country=country2)

        italianCities = City.objects.filter(country=country1)
        croatianCities = City.objects.filter(country=country2)

        arrItCities = []
        arrCrCities = []
        for city in italianCities:
            arrItCities.append(City.objects.get(id=city.id).name)
        for city in croatianCities:
            arrCrCities.append(City.objects.get(id=city.id).name)

        # check if cities are in the right countries
        self.assertEqual(arrItCities, ["L'Aquila", "Milano"])
        self.assertEqual(arrCrCities, ["Split", "Zagreb"])


class CountryTestCase(TestCase):
    def test_initcountries(self):
        Country.objects.create(name="Italy")
        Country.objects.create(name="Ireland")
        Country.objects.create(name="Croatia")

        countries = Country.objects.filter(name__startswith="I")

        arrCountries = []
        for country in countries:
            arrCountries.append(Country.objects.get(id=country.id).name)

        self.assertEqual(arrCountries, ["Italy", "Ireland"])


class CourseTestCase(TestCase):
    def test_initcourses(self):
        Course.objects.create(name='Data bases 2')
        Course.objects.create(name='Recommender systems')
        Course.objects.create(name='Advanced data mining')

        courses = Course.objects.filter(name__icontains="data")

        arrCourses = []
        for course in courses:
            arrCourses.append(Course.objects.get(id=course.id).name)

        self.assertEqual(arrCourses, ["Data bases 2", "Advanced data mining"])

    def test_coursesbyprogram(self):
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

    def test_courseresults(self):
        course1 = Course.objects.create(name='Data bases 2')
        course2 = Course.objects.create(name='Recommender systems')
        course3 = Course.objects.create(name='Advanced data mining')
        course4 = Course.objects.create(name='Machine learning')

        CourseResult.objects.create(first_course=course1, second_course=course3)
        CourseResult.objects.create(first_course=course2, second_course=course4)

        courses = CourseResult.objects.filter(first_course__name__icontains="data",
                                              second_course__name__icontains="data")

        arrCourses = []
        for courseResult in courses:
            arrCourses.append(Course.objects.get(id=courseResult.first_course.id).name)
            arrCourses.append(Course.objects.get(id=courseResult.second_course.id).name)

        self.assertEqual(arrCourses, ['Data bases 2', 'Advanced data mining'])

class FacultyTestCase(TestCase):
    def test_initfaculties(self):
        country1 = Country.objects.create(name='Croatia')
        country2 = Country.objects.create(name='Italy')

        city1 = City.objects.create(name='Zagreb', country=country1)
        city2 = City.objects.create(name='Milano', country=country2)

        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        university2 = University.objects.create(name='Politecnico di Milano', country=country2, city=city2)

        Faculty.objects.create(name='Faculty of electrical engineering and computing', university=university1,
                               city=city1)
        Faculty.objects.create(name='Faculty of computer science and engineering', university=university1, city=city1)
        Faculty.objects.create(name='Faculty of design and architecture', university=university2, city=city2)
        Faculty.objects.create(name='Faculty of telecommunications engineering', university=university2, city=city2)

        faculties = Faculty.objects.filter(name__icontains="engineering")

        arrFaculties = []
        for faculty in faculties:
            arrFaculties.append(Faculty.objects.get(id=faculty.id).name)

        self.assertEqual(arrFaculties, ["Faculty of electrical engineering and computing",
                                        "Faculty of computer science and engineering",
                                        "Faculty of telecommunications engineering"])


class ProgramTestCase(TestCase):
    def test_initprograms(self):
        Program.objects.create(name='Electrical engineering')
        Program.objects.create(name='Computing infrastructures')
        Program.objects.create(name='Computer science and engineering')
        Program.objects.create(name='Telecommunications engineering')

        programs = Program.objects.filter(name__endswith="engineering")

        arrPrograms = []
        for program in programs:
            arrPrograms.append(Program.objects.get(id=program.id).name)

        self.assertEqual(arrPrograms, ["Electrical engineering", "Computer science and engineering",
                                       "Telecommunications engineering"])

    def test_programsbyfaculty(self):
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

        program1 = Program.objects.create(name='Electrical engineering')
        program2 = Program.objects.create(name='Computing infrastructures')
        program3 = Program.objects.create(name='Computer science and engineering')
        program4 = Program.objects.create(name='Telecommunications engineering')

        ProgramFaculty.objects.create(faculty=faculty1, program=program1)
        ProgramFaculty.objects.create(faculty=faculty1, program=program2)
        ProgramFaculty.objects.create(faculty=faculty2, program=program3)
        ProgramFaculty.objects.create(faculty=faculty2, program=program4)

        ferPrograms = ProgramFaculty.objects.filter(faculty=faculty1)
        fctPrograms = ProgramFaculty.objects.filter(faculty=faculty2)

        arrFerPg = []
        arrFctPg = []
        for programFaculty in ferPrograms:
            arrFerPg.append(Program.objects.get(id=programFaculty.program.id).name)
        for programFaculty in fctPrograms:
            arrFctPg.append(Program.objects.get(id=programFaculty.program.id).name)

        self.assertEqual(arrFerPg, ['Electrical engineering', 'Computing infrastructures'])
        self.assertEqual(arrFctPg, ['Computer science and engineering', 'Telecommunications engineering'])

    def test_programsbyuniversity(self):
        country1 = Country.objects.create(name='Croatia')
        country2 = Country.objects.create(name='Italy')

        city1 = City.objects.create(name='Zagreb', country=country1)
        city2 = City.objects.create(name='Milano', country=country2)

        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        university2 = University.objects.create(name='Politecnico di Milano', country=country2, city=city2)

        program1 = Program.objects.create(name='Electrical engineering')
        program2 = Program.objects.create(name='Computing infrastructures')
        program3 = Program.objects.create(name='Computer science and engineering')
        program4 = Program.objects.create(name='Telecommunications engineering')

        ProgramUniversity.objects.create(university=university1, program=program1)
        ProgramUniversity.objects.create(university=university1, program=program2)
        ProgramUniversity.objects.create(university=university2, program=program3)
        ProgramUniversity.objects.create(university=university2, program=program4)

        uniZagrebPrograms = ProgramUniversity.objects.filter(university=university1)
        polimiPrograms = ProgramUniversity.objects.filter(university=university2)

        arrZagrebPg = []
        arrPolimiPg = []
        for programUniversity in uniZagrebPrograms:
            arrZagrebPg.append(Program.objects.get(id=programUniversity.program.id).name)
        for programUniversity in polimiPrograms:
            arrPolimiPg.append(Program.objects.get(id=programUniversity.program.id).name)

        self.assertEqual(arrZagrebPg, ['Electrical engineering', 'Computing infrastructures'])
        self.assertEqual(arrPolimiPg, ['Computer science and engineering', 'Telecommunications engineering'])

    def test_programsbycity(self):
        country1 = Country.objects.create(name='Croatia')
        country2 = Country.objects.create(name='Italy')

        city1 = City.objects.create(name='Zagreb', country=country1)
        city2 = City.objects.create(name='Milano', country=country2)

        program11 = Program.objects.create(name='Electrical engineering')
        program12 = Program.objects.create(name='Computing infrastructures')
        program21 = Program.objects.create(name='Computer science and engineering')
        program22 = Program.objects.create(name='Telecommunications engineering')

        ProgramCity.objects.create(city=city1, program=program11)
        ProgramCity.objects.create(city=city1, program=program12)
        ProgramCity.objects.create(city=city2, program=program21)
        ProgramCity.objects.create(city=city2, program=program22)

        zagrebPrograms = ProgramCity.objects.filter(city=city1)
        milanoPrograms = ProgramCity.objects.filter(city=city2)

        arrZagrebPg = []
        arrMilanoPg = []
        for programCity in zagrebPrograms:
            arrZagrebPg.append(Program.objects.get(id=programCity.program.id).name)
        for programCity in milanoPrograms:
            arrMilanoPg.append(Program.objects.get(id=programCity.program.id).name)

        self.assertEqual(arrZagrebPg, ['Electrical engineering', 'Computing infrastructures'])
        self.assertEqual(arrMilanoPg, ['Computer science and engineering', 'Telecommunications engineering'])

    def test_programsbycountry(self):
        country1 = Country.objects.create(name='Croatia')
        country2 = Country.objects.create(name='Italy')

        program11 = Program.objects.create(name='Electrical engineering')
        program12 = Program.objects.create(name='Computing infrastructures')
        program21 = Program.objects.create(name='Computer science and engineering')
        program22 = Program.objects.create(name='Telecommunications engineering')

        ProgramCountry.objects.create(country=country1, program=program11)
        ProgramCountry.objects.create(country=country1, program=program12)
        ProgramCountry.objects.create(country=country2, program=program21)
        ProgramCountry.objects.create(country=country2, program=program22)

        croatiaPrograms = ProgramCountry.objects.filter(country=country1)
        italyPrograms = ProgramCountry.objects.filter(country=country2)

        arrCrPg = []
        arrItPg = []
        for programCountry in croatiaPrograms:
            arrCrPg.append(Program.objects.get(id=programCountry.program.id).name)
        for programCountry in italyPrograms:
            arrItPg.append(Program.objects.get(id=programCountry.program.id).name)

        self.assertEqual(arrCrPg, ['Electrical engineering', 'Computing infrastructures'])
        self.assertEqual(arrItPg, ['Computer science and engineering', 'Telecommunications engineering'])


class UniversityTestCase(TestCase):
    def test_inituniversities(self):
        country1 = Country.objects.create(name='Croatia')
        country2 = Country.objects.create(name='Italy')

        city1 = City.objects.create(name='Zagreb', country=country1)
        city2 = City.objects.create(name='Milano', country=country2)
        city3 = City.objects.create(name='Torino', country=country2)

        University.objects.create(name='University of Zagreb', country=country1, city=city1)
        University.objects.create(name='Politecnico di Milano', country=country2, city=city2)
        University.objects.create(name='Politecnico di Torino', country=country2, city=city3)

        universities = University.objects.filter(name__startswith="Politecnico")

        arrUni = []
        for uni in universities:
            arrUni.append(University.objects.get(id=uni.id).name)

        self.assertEqual(arrUni, ["Politecnico di Milano", "Politecnico di Torino"])


class UserTestCase(TestCase):
    def test_initusers(self):
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


class UserCoursePostTestCase(TestCase):
    def test_contentsbycourse(self):
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

class UserFacultyPostTestCase(TestCase):
    def test_usersbyfaculty(self):
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
