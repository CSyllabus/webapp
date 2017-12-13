import pandas as pd
import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry
from lxml import html
import json

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

