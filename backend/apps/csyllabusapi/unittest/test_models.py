from django.test import TestCase
from ..models import *

class CityTestCase(TestCase):
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
    def initcountries(self):
        Country.objects.create()    # TODO complete function body


class CourseTestCase(TestCase):
    def initcourses(self):
        Course.objects.create()     # TODO complete function body

    def test_coursesbyprogram(self):
        course11 = Course.objects.create(name='Data bases 2')
        course12 = Course.objects.create(name='Recommender systems')
        course21 = Course.objects.create(name='TCP/IP')
        course22 = Course.objects.create(name='Network supervision')

        program1 = Program.objects.create(name='Computer science and engineering')
        program2 = Program.objects.create(name='Telecommunications engineering')

        CourseProgram.objects.create(course=course11, program=program1)
        CourseProgram.objects.create(course=course12, program=program1)
        CourseProgram.objects.create(course=course21, program=program2)
        CourseProgram.objects.create(course=course22, program=program2)

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

    def courseresults(self):
        Course.objects.create()     # TODO complete function body


class FacultyTestCase(TestCase):
    def initfaculties(self):
        Faculty.objects.create()    # TODO complete function body


class ProgramTestCase(TestCase):
    def initprograms(self):
        Program.objects.create()    # TODO complete function body

    def test_programsbyfaculty(self):
        country1 = Country.objects.create(name='Croatia')
        country2 = Country.objects.create(name='Italy')

        city1 = City.objects.create(name='Zagreb', country=country1)
        city2 = City.objects.create(name='Milano', country=country2)

        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        university2 = University.objects.create(name='Politecnico di Milano', country=country2, city=city2)

        faculty1 = Faculty.objects.create(name='Faculty of electrical engineering and computing', university=university1, city=city1)
        faculty2 = Faculty.objects.create(name='Faculty of computer science and telecommunications engineering', university=university2, city=city2)

        program11 = Program.objects.create(name='Electrical engineering')
        program12 = Program.objects.create(name='Computing infrastructures')
        program21 = Program.objects.create(name='Computer science and engineering')
        program22 = Program.objects.create(name='Telecommunications engineering')

        ProgramFaculty.objects.create(faculty=faculty1, program=program11)
        ProgramFaculty.objects.create(faculty=faculty1, program=program12)
        ProgramFaculty.objects.create(faculty=faculty2, program=program21)
        ProgramFaculty.objects.create(faculty=faculty2, program=program22)

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

        program11 = Program.objects.create(name='Electrical engineering')
        program12 = Program.objects.create(name='Computing infrastructures')
        program21 = Program.objects.create(name='Computer science and engineering')
        program22 = Program.objects.create(name='Telecommunications engineering')

        ProgramUniversity.objects.create(university=university1, program=program11)
        ProgramUniversity.objects.create(university=university1, program=program12)
        ProgramUniversity.objects.create(university=university2, program=program21)
        ProgramUniversity.objects.create(university=university2, program=program22)

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
    def inituniversities(self):
        University.objects.create()     # TODO complete function body


class UserFacultyTestCase(TestCase):
    def usersbyfaculty(self):
        User.objects.create()           # TODO complete function body


class TeacherCourseTestCase(TestCase):
    def teachersbycourse(self):
        TeacherCourse.objects.create()  # TODO complete function body


class UserCoursePostTestCase(TestCase):
    def usersbycourse(self):
        UserCoursePost.objects.create() # TODO complete function body


class UserFacultyPostTestCase(TestCase):
    def usersbyfaculty(self):
        UserFacultyPost.objects.create() # TODO complete function body
