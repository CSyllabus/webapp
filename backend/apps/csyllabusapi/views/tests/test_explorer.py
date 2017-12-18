from django.test import TestCase, Client
from ...models import Country, City, University, Faculty, Course, Program, ProgramCountry, ProgramCity, \
                      ProgramUniversity, ProgramFaculty, CourseProgram


class ExplorerTestCase(TestCase):

    def test_getbycountryid(self):
        """Tests get request for explorer using country_id as parameter"""
        country1 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name='Zagreb', country=country1)
        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        program1 = Program.objects.create(name='Computer science and engineering')
        course1 = Course.objects.create(name="Java")
        ProgramCountry.objects.create(program=program1, country=country1)
        ProgramCity.objects.create(program=program1, city=city1)
        ProgramUniversity.objects.create(program=program1, university=university1)
        CourseProgram.objects.create(course=course1, program=program1)

        # creation of http get request
        c = Client()
        response = c.get('/csyllabusapi/explorer?keywords=java&country_id=' + str(country1.id))

        arrCourses = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrCourses.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrCourses, ["Java"])

    def test_getbycityid(self):
        """Tests get request for explorer using city_id as parameter"""
        country1 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name='Zagreb', country=country1)
        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        program1 = Program.objects.create(name='Computer science and engineering')
        course1 = Course.objects.create(name="Java")
        ProgramCountry.objects.create(program=program1, country=country1)
        ProgramCity.objects.create(program=program1, city=city1)
        ProgramUniversity.objects.create(program=program1, university=university1)
        CourseProgram.objects.create(course=course1, program=program1)

        # creation of http get request
        c = Client()

        # Testing explorer with ProgramCity
        response = c.get('/csyllabusapi/explorer?keywords=java&city_id=' + str(city1.id))

        arrCourses = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrCourses.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrCourses, ["Java"])

    def test_getbyuniversityid(self):
        """Tests get request for explorer using university_id as parameter"""
        country1 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name='Zagreb', country=country1)
        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        program1 = Program.objects.create(name='Computer science and engineering')
        course1 = Course.objects.create(name="Java", english_level=None)
        ProgramCountry.objects.create(program=program1, country=country1)
        ProgramCity.objects.create(program=program1, city=city1)
        ProgramUniversity.objects.create(program=program1, university=university1)
        CourseProgram.objects.create(course=course1, program=program1)

        # creation of http get request
        c = Client()
        response = c.get('/csyllabusapi/explorer?keywords=java&university_id=' + str(university1.id))

        arrCourses = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrCourses.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrCourses, ["Java"])

    def test_getbyfacultyid(self):
        """Tests get request for explorer using faculty_id as parameter"""
        country1 = Country.objects.create(name='Croatia')
        city1 = City.objects.create(name='Zagreb', country=country1)
        university1 = University.objects.create(name='University of Zagreb', country=country1, city=city1)
        faculty1 = Faculty.objects.create(name='Faculty of electrical engineering and computing',
                                          university=university1, city=city1)
        program1 = Program.objects.create(name='Computer science and engineering')
        course1 = Course.objects.create(name="Java")
        ProgramCountry.objects.create(program=program1, country=country1)
        ProgramCity.objects.create(program=program1, city=city1)
        ProgramUniversity.objects.create(program=program1, university=university1)
        ProgramFaculty.objects.create(program=program1, faculty=faculty1)
        CourseProgram.objects.create(course=course1, program=program1)

        # creation of http get request
        c = Client()
        response = c.get('/csyllabusapi/explorer?keywords=java&faculty_id=' + str(faculty1.id))

        arrCourses = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrCourses.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrCourses, ["Java"])

    def test_getwithlongdescription(self):
        """Tests get request for explorer using faculty_id as parameter and course description with length of more
        than 203 characters"""
        country1 = Country.objects.create(name="Italy")
        city1 = City.objects.create(name="Milan", country=country1)
        university1 = University.objects.create(name="Politecnico di Milano", country=country1, city=city1)
        faculty1 = Faculty.objects.create(name='Faculty of computer science', university=university1, city=city1)
        program1 = Program.objects.create(name='Computer science and engineering')
        course1 = Course.objects.create(name="Soft computing",
                                        description="What is Soft Computing: fuzzy systems, Neural networks, stochastic"
                                                    " algorithms - Fuzzy models: fuzzy sets, fuzzy logic, fuzzy rules. "
                                                    "What can be represented by a fuzzy model and why. - Neural "
                                                    "networks : basic principles, supervised and unsupervised learning,"
                                                    " the main models, selection and evaluation criteria. Stochastic "
                                                    "algorithms: basic principles, model optimization, fitness function"
                                                    ", model definition, genetic algorithms, reinforcement learning. "
                                                    "Hybrid models: motivations, neuro-fuzzy systems, genetic "
                                                    "algorithms to optimize neural networks and fuzzy systems. "
                                                    "Applications of Soft computing techniques: motivations, "
                                                    "design choices, models case studies.")
        ProgramCountry.objects.create(program=program1, country=country1)
        ProgramCity.objects.create(program=program1, city=city1)
        ProgramUniversity.objects.create(program=program1, university=university1)
        ProgramFaculty.objects.create(program=program1, faculty=faculty1)
        CourseProgram.objects.create(course=course1, program=program1)

        # creation of http get request
        c = Client()
        response = c.get('/csyllabusapi/explorer?keywords=fuzzy&faculty_id=' + str(faculty1.id))

        arrCourses = []
        for value in response.data.itervalues():
            for item in value["items"]:
                arrCourses.append(item["name"])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(arrCourses, ["Soft computing"])
