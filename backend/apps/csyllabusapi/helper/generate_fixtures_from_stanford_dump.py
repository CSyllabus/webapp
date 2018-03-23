from lxml import html
import json

stanford_fixtures_json = open("../fixtures/stanford_fixtures_json.json", "w")
# reading file Stanford.xml and extracting courses
f = open("Stanford.xml","r")
stanfordList = f.read()

tree = html.fromstring(stanfordList)
ids = tree.xpath('//span[@class="courseNumber"]/text()')
titles = tree.xpath('//span[@class="courseTitle"]/text()')
descriptions = tree.xpath('//div[@class="courseDescription"]/text()')
attributes = tree.xpath('//div[@class="courseAttributes"]/text()')

# generate fixtures
fixtures = []

country_id = 6
fixtures.append({
    "model": "csyllabusapi.country",
    "pk": country_id,
    "fields": {
      "name": "United States of America",
      "img": "https://static.thousandwonders.net/Washington.D.C..original.14.jpg",
      "created": "2017-10-30T15:20:51.049Z",
      "modified": "2017-10-30T15:20:52.235Z"
    }
  }
)
city_id = 10
fixtures.append({
    "model": "csyllabusapi.city",
    "pk": city_id,
    "fields": {
      "name": "Palo Alto",
      "img": "https://fr.wikipedia.org/wiki/Palo_Alto#/media/File:Stanford_University_campus_from_above.jpg",
      "created": "2017-10-30T15:20:51.049Z",
      "modified": "2017-10-30T15:20:52.235Z",
      "country": country_id
    }
  }
)
university_id = 7
fixtures.append(
  {
    "model": "csyllabusapi.university",
    "pk": university_id,
    "fields": {
      "name": "University of Stanford",
      "description": "Stanford University is one of the world's leading research universities. It is known for its entrepreneurial character, drawn from the legacy of its founders, Jane and Leland Stanford, and its relationship to Silicon Valley. Areas of excellence range from the humanities to social sciences to engineering and the sciences. Stanford is located in California's Bay Area, one of the most intellectually dynamic and culturally diverse areas of the nation. Stanford University is accredited by the Accrediting Commission for Senior Colleges and Universities of the Western Association of Schools and Colleges (WASC).",
      "img": "http://www.neucampusplanning.com/wp-content/uploads/2016/08/Stanford-Aerial.jpg",
      "created": "2017-10-30T15:05:19.541Z",
      "modified": "2017-10-30T15:05:20.945Z",
      "country": country_id,
      "city": city_id
    }
  }
)

# appending programs fixtures
program_id = 37
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

# appending courses fixtures
course_id = 693
course_uni_id = 2424
course_program_id = 2424
for i in range(len(descriptions)):
    course_name = titles[i].strip()
    try:
        course_credits = int(attributes[i].split('|')[1].strip().split("Units:")[1].split("-")[1].strip())
    except:
        try:
            course_credits = int(attributes[i].split('|')[1].strip().split("Units:")[1].strip())
        except:
            course_credits = None
    try:
        course_semester = attributes[i].split('|')[0].strip().split("Terms:")[1].strip()
    except:
        course_semester = None
    course_description = descriptions[i].strip()

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
            "model": "csyllabusapi.courseuniversity",
            "pk": course_uni_id,
            "fields": {
                "course": course_id,
                "university": university_id,
                "created": "2017-10-30T15:07:40.122Z"
            }
        }
    )
    course_uni_id = course_uni_id + 1

    fixtures.append(
        {
            "model": "csyllabusapi.course",
            "pk": course_id,
            "fields": {
                "name": course_name,
                "description": course_description,
                "ects": course_credits,
                "semester": None,
                "created": "2017-10-30T15:07:40.122Z",
                "modified": "2017-10-30T15:07:41.673Z"
            }
        }
    )
    course_id = course_id + 1

json.dump(fixtures,stanford_fixtures_json)
