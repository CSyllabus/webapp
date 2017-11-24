from django.core.management.base import BaseCommand, CommandError

import django
import os
import datetime
from django.utils import timezone
from ...models import Course, CourseResult
from gensim import corpora, models, similarities
from collections import defaultdict
class Command(BaseCommand):
    help = 'Does some magical work'

    def handle(self, *args, **options):
        """ Do your work here """
        #self.stdout.write('There are {} things!'.format(Course.objects.count()))
        course_count = Course.objects.count()
        courses = Course.objects.all()

        documents = []
        document_courses = []

        #words not to take into consideration
        stoplist = set(['is', 'how', 'and', 'or'])
        print "Created stop list."

        for course in courses:
            documents.append(course.description)
            document_courses.append(course)

        print "Fetched course descriptions."
        texts = [[word.lower() for word in document.split()
                  if word.lower() not in stoplist]
                 for document in documents]

        frequency = defaultdict(int)
        for text in texts:
            for token in text:
                frequency[token] += 1
        texts = [[token for token in text if frequency[token] > 1]
                 for text in texts]
        dictionary = corpora.Dictionary(texts)
        print "Created a dictionary of word-bag."
        # doc2bow counts the number of occurences of each distinct word,
        # converts the word to its integer word id and returns the result
        # as a sparse vector
        corpus = [dictionary.doc2bow(text) for text in texts]
        lsi = models.LsiModel(corpus, id2word=dictionary, num_topics=300)

        j = 0
        for course in courses:
            print "working on" + str(j) + " of " + str(course_count)
            doc = course.description
            vec_bow = dictionary.doc2bow(doc.lower().split())

            # convert the query to LSI space
            vec_lsi = lsi[vec_bow]
            index = similarities.MatrixSimilarity(lsi[corpus])

            # perform a similarity query against the corpus
            sims = index[vec_lsi]
            sims = sorted(enumerate(sims), key=lambda item: -item[1])

            j = j + 1
            i = 0
            for similarity in sims:
                if i != 0:
                    CourseResult.objects.create(first_course_id=document_courses[sims[0][0]].id,
                                                second_course_id=document_courses[sims[i][0]].id,
                                                result = sims[i][1])
                i = i + 1

        #print sims[1:11]
        #print document_courses[sims[1][0]].description
        #print document_courses[sims[2][0]].description
        #print document_courses[sims[3][0]].description

        #    for course_temp in courses:
        #        if course.id != course_temp.id and course_temp not in skip_list:
        #            print "compare"
        #    skip_list.append(course.id)