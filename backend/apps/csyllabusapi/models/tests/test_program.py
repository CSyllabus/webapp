from django.test import TestCase
from .. import Program, Country, City, University, Faculty, ProgramFaculty, ProgramUniversity, ProgramCity, \
    ProgramCountry

class ProgramTestCase(TestCase):
    def test_initprogram(self):
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

    def test_strprogram(self):
        program1 = Program.objects.create(name='Electrical engineering')

        self.assertEqual(str(program1), program1.name)

    def test_programbyfaculty(self):
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

    def test_programbyuniversity(self):
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

    def test_programbycity(self):
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

    def test_programbycountry(self):
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