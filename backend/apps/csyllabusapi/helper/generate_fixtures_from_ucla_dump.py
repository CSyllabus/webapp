from lxml import html
import json

ucla_fixtures_json = open("../fixtures/ucla_fixtures_json.json", "w")
# reading file UCLA.xml and extracting courses
f = open("UCLA.xml","r")
uclaList = f.read()

tree = html.fromstring(uclaList)
titles = tree.xpath('//h3/text()')
attributes = tree.xpath('//p/text()')

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
city_id = 11
fixtures.append({
    "model": "csyllabusapi.city",
    "pk": city_id,
    "fields": {
      "name": "Los Angeles",
      "img": "http://www.tokkoro.com/picsup/440277-los-angeles-pc-backgrounds-hd-free.jpg",
      "created": "2017-10-30T15:20:51.049Z",
      "modified": "2017-10-30T15:20:52.235Z",
      "country": country_id
    }
  }
)
university_id = 8
fixtures.append(
  {
    "model": "csyllabusapi.university",
    "pk": university_id,
    "fields": {
      "name": "University of California, Los Angeles",
      "img": "http://worldkings.org/Userfiles/Upload/images/Ucla.jpg",
      "created": "2017-10-30T15:05:19.541Z",
      "modified": "2017-10-30T15:05:20.945Z",
      "country": country_id,
      "city": city_id
    }
  }
)

#appending programs fixtures
program_id = 38
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
i = 0
j = 0
course_id = 872
course_uni_id = 872
course_program_id = 2603
while i < len(titles):
    course_name = titles[i].split(". ")[1]
    course_credits = attributes[j].split("Units: ")[1]
    try:
        course_credits = course_credits.split(" to ")[1]
    except:
        pass
    course_description = attributes[j+1]

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
                "name" : course_name,
                "description": course_description,
                "ects": course_credits,
                "semester": None,
                "created": "2017-10-30T15:07:40.122Z",
                "modified": "2017-10-30T15:07:41.673Z"
            }
        }
    )
    i = i + 1
    j = j + 2
    course_id = course_id + 1

json.dump(fixtures, ucla_fixtures_json)
