f = open("html.txt", "r")

urls = []
names = []
opisi = []

url_count = 0
name_count = 0
opis_count = 0

while (1):
    s = f.readline()
    # if (s.startswith("   <div")):
    # print ("prvi_div: "+s)
    if (s.startswith("      <div")):
        # print ("drugi_div: "+s)
        prvi = s.split('href="')
        drugi = prvi[-1].split('">')
        if (drugi[0].startswith("http")):
            urls.append(drugi[0])
            url_count += 1
        treci = drugi[-1].split("</a>")
        if (treci[0].startswith("EE")):
            names.append(treci[0])
            name_count += 1

    if (s.startswith("            <p>")):
        prvi = s.split("<p>")
        drugi = prvi[1].split("</p>")
        opisi.append(drugi[0])
        opis_count += 1
    if (s == ""):
        break

# print urls
# print names
# print opisi

# print url_count
# print name_count
# print opis_count




fixture = '[{"model": "csyllabusapi.country", "pk": 5, "fields": {"name": "Texas, USA", "img": "https://csyllabus.com/images/texas.jpg", "created": "2017-11-30T15:20:51.049Z", "modified": "2017-11-30T15:20:52.235Z"}}, {"model": "csyllabusapi.city", "pk": 9, "fields": {"name": "Austin", "img": "https://csyllabus.com/images/austin.jpg", "created": "2017-11-30T15:20:51.049Z", "modified": "2017-11-30T15:20:52.235Z", "country": 5}},{"model": "csyllabusapi.university", "pk": 6, "fields": {"name": "The University of Texas at Austin", "created": "2017-11-30T15:05:19.541Z", "modified": "2017-11-30T15:05:20.945Z", "country": 5, "city": 9}}, {"model": "csyllabusapi.program", "pk": 35, "fields": {"name": "Electrical and Computer Engineering", "study_level": "undergraduate", "created": "2017-11-30T15:07:40.122Z", "modified": "2017-11-30T15:07:41.673Z"}}, {"model": "csyllabusapi.programuniversity", "pk": 35, "fields": {"university": 6, "program": 35, "created": "2017-11-30T15:07:40.122Z"}}, {"model": "csyllabusapi.programcity", "pk": 35, "fields": {"city": 9, "program": 35, "created": "2017-11-30T15:07:40.122Z"}}, {"model": "csyllabusapi.programcountry", "pk": 35, "fields": {"country": 5, "program": 35, "created": "2017-11-30T15:07:40.122Z"}},'

counter_cp = 2265
counter_course = 534
counter_cu = 534
# , "url": "'+urls[i]+'"



for i in xrange(len(urls)):
    fixture += '{"pk": ' + str(counter_cp) + ', "model": "csyllabusapi.courseprogram", "fields": {"course": ' + str(
        counter_course) + ', "program": 35, "created": "2017-11-30T15:07:40.122Z"}},'

    fixture += '{"pk": ' + str(counter_cu) + ', "model": "csyllabusapi.courseuniversity", "fields": {"course": ' + str(
        counter_course) + ', "university": 6, "created": "2017-11-30T15:07:40.122Z"}},'
    fixture += '{"pk": ' + str(counter_course) + ', "model": "csyllabusapi.course", "fields":{	"name": "' + names[
        i] + '", "created":"2017-11-30T15:07:40.122Z", "modified": "2017-11-30T15:07:41.673Z", "description": "' + \
               opisi[i] + '", "url": "' + urls[i] + '"}},'
    counter_cp += 1
    counter_course += 1
    counter_cu += 1

f = open("texas_fixture_json.txt", "w+")
f.write(fixture)

