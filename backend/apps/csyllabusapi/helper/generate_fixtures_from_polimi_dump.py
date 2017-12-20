import pandas as pd
import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry
from lxml import html
import json

# reading file polimi_courses_nodescription and extracting course description from polimi course catalogue website
df = pd.read_csv('polimi_courses_nodescription.csv', sep=';')
df = df.loc[df['PSPA'] == 'T2A']
df = df.loc[df['LINGUA_EROGAZIONE_INSEGN'] == 'EN']
df = df.drop_duplicates(['C_INSEGN'], keep='first').reset_index()
courseList = []

for index, row in df.iterrows():

    session = requests.Session()
    retry = Retry(connect=3, backoff_factor=0.5)
    adapter = HTTPAdapter(max_retries=retry)
    session.mount('http://', adapter)
    session.mount('https://', adapter)
    r = session.get("https://www4.ceda.polimi.it/manifesti/manifesti/controller/ManifestoPublic.do?EVN_DETTAGLIO_RIGA_"
                    "MANIFESTO=evento&k_corso_la=" + str(row["K_CORSO_LA"]) + "&k_indir=" + str(row["PSPA"])
                    + "&idItemOfferta=131288&idRiga=216828&codDescr=0" + str(row["C_INSEGN"]) + "&semestre="
                    + str(row["SEMESTRE_PIANO"]) + "&aa=" + str(row["AA"]) + "&lang=" + str(row["PSPA_LINGUA_OFFERTA"])
                    + "&jaf_currentWFID=main")

    tree = html.fromstring(r.content)
    attributes = tree.xpath('//td[@colspan="1"][@rowspan="1"][@width="80%"][@class="ElementInfoCard2 jaf-card-element"]'
                            '/text()')

    course = {
              'id': attributes[5].strip(),
              'name': attributes[6].strip().title(),
              'ects': int(float(attributes[8].strip())),
              'semester': 1 if attributes[9].strip() == 'First Semester' else 2,
              'description': attributes[10].strip().replace('\t', '').replace('\n', '')
              }

    if course['id'] == str(0) + str(row["C_INSEGN"]):
        print(course)
        if index < len(df.index)-1:
            courseList.append(json.dumps(course) + ",")
        else:
            courseList.append(json.dumps(course))

file = open("polimi_courses.json","w")
file.write("[")
for course in courseList:
    file.write(course)
file.write("]")
file.close()

# generating fixtures
polimi_course_json = open("polimi_courses.json")
polimi_fixtures_json = open("../fixtures/polimi_fixtures_json.json", "w")
polimi_courses = json.load(polimi_course_json)

fixtures = []

country_id = 2
fixtures.append({
    "model": "csyllabusapi.country",
    "pk": country_id,
    "fields": {
      "name": "Italy",
      "img": "https://csyllabus.com/images/italy.jpg",
      "created": "2017-10-30T15:20:51.049Z",
      "modified": "2017-10-30T15:20:52.235Z"
    }
  }
)
city_id = 3
fixtures.append({
    "model": "csyllabusapi.city",
    "pk": city_id,
    "fields": {
      "name": "Milano",
       "img": "https://csyllabus.com/images/milan.jpg",
      "created": "2017-10-30T15:20:51.049Z",
      "modified": "2017-10-30T15:20:52.235Z",
      "country": country_id
    }
  }
)
university_id = 2
fixtures.append(
  {
    "model": "csyllabusapi.university",
    "pk": university_id,
    "fields": {
      "name": "Politecnico di Milano",
      "created": "2017-10-30T15:05:19.541Z",
      "modified": "2017-10-30T15:05:20.945Z",
      "country": country_id,
      "city": city_id
    }
  }
)

#appending programs fixtures
program_id = 36
fixtures.append(
    {
        "model": "csyllabusapi.program",
        "pk": program_id,
        "fields": {
            "name" : "Computer Science and Engineering",
            "study_level": "undergraduate and graduate",
            "created": "2017-10-30T15:07:40.122Z",
            "modified": "2017-10-30T15:07:41.673Z"
        }
     }
)

fixtures.append(
    {
        "model": "csyllabusapi.programuniversity",
         "pk": program_id,
        "fields": {
            "university": university_id,
            "program": program_id,
            "created": "2017-10-30T15:07:40.122Z"
        }
    }
)

fixtures.append(
    {
        "model": "csyllabusapi.programcity",
        "pk": program_id,
        "fields": {
            "city": city_id,
            "program": program_id,
            "created": "2017-10-30T15:07:40.122Z"
        }
    }
)
fixtures.append(
    {
        "model": "csyllabusapi.programcountry",
        "pk": program_id,
        "fields": {
            "country": country_id,
            "program": program_id,
            "created": "2017-10-30T15:07:40.122Z"
        }
    }
)

#appending courses fixtures
course_id = 605
course_program_id = 2336
for course in polimi_courses:
    fixtures.append(
        {
            "model": "csyllabusapi.courseprogram",
            "pk": course_program_id,
            "fields": {
                "course": course_id,
                "program": program_id,
                "created": "2017-10-30T15:07:40.122Z"
            }
        }
    )
    course_program_id = course_program_id + 1
    fixtures.append(
        {
            "model": "csyllabusapi.course",
            "pk": course_id,
            "fields": {
                "name" : course['name'],
                "description": course['description'],
                "ects": course['ects'],
                "semester": course['semester'],
                "created": "2017-10-30T15:07:40.122Z",
                "modified": "2017-10-30T15:07:41.673Z"
            }
        }
    )
    course_id = course_id + 1

json.dump(fixtures,polimi_fixtures_json)
