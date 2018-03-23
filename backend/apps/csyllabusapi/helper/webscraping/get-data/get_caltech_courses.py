import requests
from lxml import html
import json
from bs4 import BeautifulSoup

courseList = []

# request url content
url = "http://catalog.caltech.edu/current/cs"
r = requests.get(url)

# creating html reader using BeautifulSoup package
soup = BeautifulSoup(r.content, "lxml")
# Search for all p html tags
for p in soup.find_all('p'):
    # get inside values from p tag
    tree = html.fromstring(str(p))
    # each course is made this way : <p><strong>courseId.courseName</strong><em>courseCredits</em>courseDescription</p>
    # get course id and course name
    course_id_name = tree.xpath('//p//strong/text()')
    # get course credits
    course_credits = tree.xpath('//p//em/text()')
    # get course description
    course_desc = tree.xpath('//p/text()')

    # check if courseIdName and courseCredits are set
    if course_id_name and course_credits:
        course = {
            'id': course_id_name[0].split('.')[0].split(' abc')[0].strip(),
            'name': course_id_name[0].split('.')[1].strip(),
            'ects': course_credits[0].split(' unit')[0].strip(),
            'semester': None,
            'description': None
        }
        # check if courseDescription is set
        if course_desc:
            course['description'] = course_desc[0].strip().replace("\u2019", "'")
        courseList.append(json.dumps(course) + ",")

# write courseList into json file for later upload into DB
file = open("/Volumes/SSD-Thomas/Documents/GitHub/csyllabus/webapp/backend/apps/csyllabusapi/helper/webscraping"
              "/jsonresult/caltech_courses.json", "w")
file.write("[")
for course in courseList:
    file.write(course)
file.write("]")
file.close()
