from django.test import TestCase, Client
from ...models import Country, City, University, Faculty, Course, CourseProgram
from ...models import Program, ProgramCountry, ProgramCity, ProgramUniversity, ProgramFaculty
from ...management.commands import course_similarity


class ComparatorTestCase(TestCase):
    def test_getbycountryid(self):
        # creation of first course
        country1 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name='Zagreb', country=country1)
        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        program1 = Program.objects.create(name='Data science', study_level='Postgraduate')
        course1 = Course.objects.create(name='Data bases 2', description='Data bases 2 course')
        ProgramCountry.objects.create(program=program1, country=country1)
        ProgramCity.objects.create(program=program1, city=city1)
        ProgramUniversity.objects.create(program=program1, university=university1)
        CourseProgram.objects.create(course=course1, program=program1)

        # creation of second course

        country2 = Country.objects.create(name='Italy')
        city2 = City.objects.create(name='Milano', country=country2)
        university2 = University.objects.create(name='Politecnico di Milano', country=country2, city=city2)
        program2 = Program.objects.create(name='Computer science and engineering', study_level='Postgraduate')

        course2 = Course.objects.create(name='Data mining', description='Data mining course')

        ProgramCountry.objects.create(program=program2, country=country2)
        ProgramCity.objects.create(program=program2, city=city2)
        ProgramUniversity.objects.create(program=program2, university=university2)
        CourseProgram.objects.create(course=course2, program=program2)

        # searching for similarities between the courses
        cmd = course_similarity.Command()
        course_similarity.Command.handle(cmd)

        # creation of http get request
        c = Client()
        response = c.get('/csyllabusapi/comparator?course=' + str(course1.id) + '&country_id=' + str(country2.id))

        arrCourses = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrCourses.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrCourses, ["Data bases 2", "Data mining"])

    def test_getbycityid(self):
        # creation of first course
        country1 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name='Zagreb', country=country1)
        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        program1 = Program.objects.create(name='Data science', study_level='Postgraduate')
        course1 = Course.objects.create(name='Data bases 2', description='Data bases 2 course')
        ProgramCountry.objects.create(program=program1, country=country1)
        ProgramCity.objects.create(program=program1, city=city1)
        ProgramUniversity.objects.create(program=program1, university=university1)
        CourseProgram.objects.create(course=course1, program=program1)

        # creation of second course
        country2 = Country.objects.create(name='Italy')
        city2 = City.objects.create(name='Milano', country=country2)
        university2 = University.objects.create(name='Politecnico di Milano', country=country2, city=city2)
        program2 = Program.objects.create(name='Computer science and engineering', study_level='Postgraduate')
        course2 = Course.objects.create(name='Data mining', description='Data mining course')
        ProgramCountry.objects.create(program=program2, country=country2)
        ProgramCity.objects.create(program=program2, city=city2)
        ProgramUniversity.objects.create(program=program2, university=university2)
        CourseProgram.objects.create(course=course2, program=program2)

        # searching for similarities between the courses
        cmd = course_similarity.Command()
        course_similarity.Command.handle(cmd)

        # creation of http get request
        c = Client()
        response = c.get('/csyllabusapi/comparator?course=' + str(course1.id) + '&city_id=' + str(city2.id))

        arrCourses = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrCourses.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrCourses, ["Data bases 2", "Data mining"])

    def test_getbyuniversityid(self):
        # creation of first course
        country1 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name='Zagreb', country=country1)
        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        program1 = Program.objects.create(name='Data science', study_level='Postgraduate')
        course1 = Course.objects.create(name='Data bases 2', description='Data bases 2 course')
        ProgramCountry.objects.create(program=program1, country=country1)
        ProgramCity.objects.create(program=program1, city=city1)
        ProgramUniversity.objects.create(program=program1, university=university1)
        CourseProgram.objects.create(course=course1, program=program1)

        # creation of second course
        country2 = Country.objects.create(name='Italy')
        city2 = City.objects.create(name='Milano', country=country2)
        university2 = University.objects.create(name='Politecnico di Milano', country=country2, city=city2)
        program2 = Program.objects.create(name='Computer science and engineering', study_level='Postgraduate')
        course2 = Course.objects.create(name='Data mining', description='Data mining course')
        ProgramCountry.objects.create(program=program2, country=country2)
        ProgramCity.objects.create(program=program2, city=city2)
        ProgramUniversity.objects.create(program=program2, university=university2)
        CourseProgram.objects.create(course=course2, program=program2)

        # searching for similarities between the courses
        cmd = course_similarity.Command()
        course_similarity.Command.handle(cmd)

        # creation of http get request
        c = Client()
        response = c.get('/csyllabusapi/comparator?course=' + str(course1.id) + '&university_id=' + str(university2.id))

        arrCourses = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrCourses.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrCourses, ["Data bases 2", "Data mining"])

    def test_getbyfacultyid(self):
        # creation of first course
        country1 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name='Zagreb', country=country1)
        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        faculty1 = Faculty.objects.create(name='Faculty of electrical engineering and computing',
                                          university=university1, city=city1)
        program1 = Program.objects.create(name='Data science', study_level='Postgraduate')
        course1 = Course.objects.create(name='Data bases 2', description='Data bases 2 course')
        ProgramCountry.objects.create(program=program1, country=country1)
        ProgramCity.objects.create(program=program1, city=city1)
        ProgramUniversity.objects.create(program=program1, university=university1)
        ProgramFaculty.objects.create(program=program1, faculty=faculty1)
        CourseProgram.objects.create(course=course1, program=program1)

        # creation of second course
        country2 = Country.objects.create(name='Italy')
        city2 = City.objects.create(name='Milano', country=country2)
        university2 = University.objects.create(name='Politecnico di Milano', country=country2, city=city2)
        faculty2 = Faculty.objects.create(name='Faculty of computer science and engineering', university=university2,
                                          city=city2)
        program2 = Program.objects.create(name='Computer science and engineering', study_level='Postgraduate')
        course2 = Course.objects.create(name='Data mining', description='Data mining course')
        ProgramCountry.objects.create(program=program2, country=country2)
        ProgramCity.objects.create(program=program2, city=city2)
        ProgramUniversity.objects.create(program=program2, university=university2)
        ProgramFaculty.objects.create(program=program2, faculty=faculty2)
        CourseProgram.objects.create(course=course2, program=program2)

        # searching for similarities between the courses
        cmd = course_similarity.Command()
        course_similarity.Command.handle(cmd)

        # creation of http get request
        c = Client()
        response = c.get('/csyllabusapi/comparator?course=' + str(course1.id) + '&faculty_id=' + str(faculty2.id))

        arrCourses = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrCourses.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrCourses, ["Data bases 2", "Data mining"])

    def test_getwithlongdescription(self):
        # creation of first course
        country1 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name='Zagreb', country=country1)
        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        faculty1 = Faculty.objects.create(name='Faculty of electrical engineering and computing',
                                          university=university1, city=city1)
        program1 = Program.objects.create(name='Data science', study_level='Postgraduate')
        course1 = Course.objects.create(name='Data bases 2',
                                        description='The course aims to prepare software designers on the effective '
                                                    'development of database applications. First, the course presents '
                                                    'the fundamental features of current database architectures, with '
                                                    'a specific emphasis on the concept of transaction and its '
                                                    'realization in centralized and distributed systems. Then, the '
                                                    'course illustrates the main directions in the evolution of '
                                                    'database systems, presenting approaches that go beyond the '
                                                    'relational model, like active databases, object systems and XML '
                                                    'data management solutions.')
        ProgramCountry.objects.create(program=program1, country=country1)
        ProgramCity.objects.create(program=program1, city=city1)
        ProgramUniversity.objects.create(program=program1, university=university1)
        ProgramFaculty.objects.create(program=program1, faculty=faculty1)
        CourseProgram.objects.create(course=course1, program=program1)

        # creation of second course
        country2 = Country.objects.create(name='Italy')
        city2 = City.objects.create(name='Milano', country=country2)
        university2 = University.objects.create(name='Politecnico di Milano', country=country2, city=city2)
        faculty2 = Faculty.objects.create(name='Faculty of computer science and engineering', university=university2,
                                          city=city2)
        program2 = Program.objects.create(name='Computer science and engineering', study_level='Postgraduate')
        course2 = Course.objects.create(name='Data mining',
                                        description='Data Mining studies algorithms and computational paradigms that '
                                                    'allow computers to find patterns and regularities in databases, '
                                                    'perform prediction and forecasting, and generally improve their '
                                                    'performance through interaction with data. It is currently '
                                                    'regarded as the key element of a more general process called'
                                                    ' Knowledge Discovery that deals with extracting useful knowledge '
                                                    'from raw data. The knowledge discovery process includes data '
                                                    'selection, cleaning, coding, using different statistical and '
                                                    'machine learning techniques, and visualization of the generated '
                                                    'structures. The course will cover all these issues and will '
                                                    'illustrate the whole process by examples. Special emphasis will '
                                                    'be give to the Machine Learning methods as they provide the real '
                                                    'knowledge discovery tools. Important related technologies, as '
                                                    'data warehousing and on-line analytical processing (OLAP) will be '
                                                    'also discussed. The students will use recent Data Mining software.'
                                                    ' Enrollment in this course is limited to 15 students.)')
        ProgramCountry.objects.create(program=program2, country=country2)
        ProgramCity.objects.create(program=program2, city=city2)
        ProgramUniversity.objects.create(program=program2, university=university2)
        ProgramFaculty.objects.create(program=program2, faculty=faculty2)
        CourseProgram.objects.create(course=course2, program=program2)

        # searching for similarities between the courses
        cmd = course_similarity.Command()
        course_similarity.Command.handle(cmd)

        # creation of http get request
        c = Client()
        response = c.get('/csyllabusapi/comparator?course=' + str(course1.id) + '&faculty_id=' + str(faculty2.id))

        arrCourses = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrCourses.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrCourses, ["Data bases 2", "Data mining"])

    def test_getwithmultiplecourses(self):
        # creation of first course
        country1 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name='Zagreb', country=country1)
        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        program1 = Program.objects.create(name='Data science', study_level='Postgraduate')
        course1 = Course.objects.create(name='Data bases 2', description='Data bases 2 course')
        ProgramCountry.objects.create(program=program1, country=country1)
        ProgramCity.objects.create(program=program1, city=city1)
        ProgramUniversity.objects.create(program=program1, university=university1)
        CourseProgram.objects.create(course=course1, program=program1)

        # creation of courses for to compare with
        country2 = Country.objects.create(name='Italy')
        city2 = City.objects.create(name='Milano', country=country2)
        university2 = University.objects.create(name='Politecnico di Milano', country=country2, city=city2)
        faculty2 = Faculty.objects.create(name='Faculty of computer science and engineering', university=university2,
                                          city=city2)
        program2 = Program.objects.create(name='Computer science and engineering', study_level='Postgraduate')
        course2 = Course.objects.create(name='Data mining', description='Data mining course')
        course3 = Course.objects.create(name='Model identification and data analysis',
                                        description='Model identification and data analysis course')
        course4 = Course.objects.create(name='Data acquisition systems', description='Data acquisition systems course')
        course5 = Course.objects.create(name='Data management for the web',
                                        description='Data management for the web course')
        course6 = Course.objects.create(name='Data bases 1', description='Data bases 1 course')
        ProgramCountry.objects.create(program=program2, country=country2)
        ProgramCity.objects.create(program=program2, city=city2)
        ProgramUniversity.objects.create(program=program2, university=university2)
        ProgramFaculty.objects.create(program=program2, faculty=faculty2)
        CourseProgram.objects.create(course=course2, program=program2)
        CourseProgram.objects.create(course=course3, program=program2)
        CourseProgram.objects.create(course=course4, program=program2)
        CourseProgram.objects.create(course=course5, program=program2)
        CourseProgram.objects.create(course=course6, program=program2)

        # searching for similarities between the courses
        cmd = course_similarity.Command()
        course_similarity.Command.handle(cmd)

        # creation of http get request
        c = Client()
        response = c.get('/csyllabusapi/comparator?course=' + str(course1.id) + '&faculty_id=' + str(faculty2.id))

        arrCourses = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrCourses.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(arrCourses), 5)

