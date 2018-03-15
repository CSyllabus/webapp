from django.core.management.base import BaseCommand, CommandError

import django
import os
import datetime
from django.utils import timezone
from ...models import Course, CourseUniversity, University, Faculty, CourseResult
from gensim import corpora, models, similarities
from collections import defaultdict
from nltk.corpus import stopwords


class Command(BaseCommand):
    help = 'Does some magical work'

    def handle(self, *args, **options):
        universities = University.objects.all()
        faculties = Faculty.objects.all()
        """ Do your work here """
        # self.stdout.write('There are {} things!'.format(Course.objects.count()))
        course_count = Course.objects.count()
        courses = Course.objects.all().order_by('id')

        documents = []
        documents_names = []
        document_courses = []

        # words not to take into consideration
        # parametar 1: remove keywords from decriptions
        stoplist = stopwords.words('english')
        stoplist = stoplist + ['is', 'how', 'or', 'to', 'of', 'the',
                               'in', 'for', 'on', 'will', 'a', 'advanced', 'an', 'and', 'are', 'as', 'be', 'by',
                               'course',
                               'with', 'some', 'student', 'students', 'systems', 'system', 'basic',
                               'this', 'knowledge', 'use', 'using', 'well', 'hours;', 'four']

        # parametar 1: remove keywords from names
        stoplist_names = stopwords.words('english')

        print "Created stop list."

        for course in courses:
            documents.append(course.description + course.name)
            documents_names.append(course.name)
            document_courses.append(course)

        print "Fetched course descriptions."
        texts = [[word.replace(".", "").lower() for word in document.split()
                  if word.replace(".", "").lower() not in stoplist]
                 for document in documents]

        # to add remove list for names
        # texts_names = [[word.lower() for word in document_name.split()
        #               if word.replace(".", "").lower() not in stoplist_names]
        #               for document_name in documents_names]

        frequency = defaultdict(int)
        for text in texts:
            for token in text:
                frequency[token] += 1
        texts = [[token for token in text if frequency[token] > 1]
                 for text in texts]

        dictionary = corpora.Dictionary(texts)
        dictionary.filter_n_most_frequent(15)
        dictionary.save_as_text("dictionary.txt", sort_by_word=False)

        # frequency_names = defaultdict(int)
        # for text in texts_names:
        #    for token in text:
        #        frequency_names[token] += 1
        # texts_names = [[token for token in text if frequency_names[token] > 1]
        #               for text in texts_names]

        # save to fale keywords sorted by appereance
        # dictionary_names = corpora.Dictionary(texts_names)

        print "Created a dictionary of word-bag."
        # doc2bow counts the number of occurences of each distinct word,
        # converts the word to its integer word id and returns the result
        # as a sparse vector
        corpus = [dictionary.doc2bow(text) for text in texts]
        corpora.MmCorpus.serialize('corpus.mm', corpus)

        # print(corpus)
        # parametar 2: num_topics
        lsi = models.LsiModel(corpus, id2word=dictionary, num_topics=125)
        lsi.save("lsi.model")

        # for i in lsi.show_topics():
        #    print i[0], i[1]

        # parametar 2: num_topics
        # corpus_names = [dictionary_names.doc2bow(text) for text in texts_names]
        # lsi_names = models.LsiModel(corpus_names, id2word=dictionary_names, num_topics=125)

        course_universities = {}
        for university in universities:
            course_universities[university.id] = getCoursesInUniversity(university.id)

        j = 0
        CourseResult.objects.all().delete()

        from datetime import datetime

        course_results = []
        id = 0
        for course in courses:
            startTime = datetime.now(tz=timezone.utc)
            j += 1
            print "Working on course " + str(j) + " of " + str(course_count)
            doc = course.description + course.name
            vec_bow = dictionary.doc2bow(doc.lower().split())

            # doc_name = course.name
            # vec_bow_name = dictionary_names.doc2bow(doc_name.lower().split())

            # convert the query to LSI space
            vec_lsi = lsi[vec_bow]
            index = similarities.MatrixSimilarity(lsi[corpus])

            # vec_lsi_name = lsi_names[vec_bow_name]
            # index_name = similarities.MatrixSimilarity(lsi_names[corpus_names])

            # perform a similarity query against the corpus
            sims = index[vec_lsi]
            sims = sorted(enumerate(sims), key=lambda item: -item[1])

            # sims_names = index_name[vec_lsi_name]
            # sims_names = sorted(enumerate(sims_names), key=lambda item: -item[1])
            for university in universities:

                course_ids = course_universities[university.id]
                sims_cpy = [similarity for similarity in sims if (similarity[0] in course_ids)]

                i = 0
                for similarity in sims_cpy:
                    # print similarity
                    if i >= 5:
                        break
                    if course.id != document_courses[similarity[0]].id:
                        # parametar 3: ratio descriptions vs names
                        id += 1
                        course_results.append(CourseResult(id = id,
                                                           created = startTime,
                                                           modified = startTime,
                                                        first_course_id=course.id,
                                                           second_course_id=document_courses[similarity[0]].id,
                                                           result=similarity[1]))
                        # CourseResult.objects.create(first_course_id=course.id,
                        #                            second_course_id=document_courses[similarity[0]].id,
                        #                            result=similarity[1])
                    i += 1

                    # print sims[1:11]
                    # print document_courses[sims[1][0]].description
                    # print document_courses[sims[2][0]].description
                    # print document_courses[sims[3][0]].description

                    #    for course_temp in courses:
                    #        if course.id != course_temp.id and course_temp not in skip_list:
                    #            print "compare"
                    #    skip_list.append(course.id)
            CourseResult.objects.bulk_create(course_results)
            #print course_results, "\r\n"
            course_results = []
            print "elapsed: ", str(datetime.now(tz=timezone.utc) - startTime), "\r\n"


def getCoursesInUniversity(university_id):
    course_universities = CourseUniversity.objects.filter(university_id=university_id)
    course_ids = []
    for course_university in course_universities:
        course_ids.append(course_university.course.id)
    return course_ids
