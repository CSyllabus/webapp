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
        # self.stdout.write('There are {} things!'.format(Course.objects.count()))
        course_count = Course.objects.count()
        courses = Course.objects.all()

        documents = []
        documents_names = []
        document_courses = []

        # words not to take into consideration
        # parametar 1: remove keywords from decriptions
        stoplist = set(['is', 'how', 'or', 'to', 'of', 'the',
                        'in', 'for', 'on', 'will', 'a', 'advanced', 'an', 'and', 'are', 'as', 'be', 'by', 'course',
                        'with', 'some', 'student', 'students', 'systems', 'system', 'basic',
                        'this', 'knowledge', 'use', 'using', 'well'])

        # parametar 1: remove keywords from names
        stoplist_names = set(['the'])

        print "Created stop list."

        for course in courses:
            documents.append(course.description)
            documents_names.append(course.name)
            document_courses.append(course)

        print "Fetched course descriptions."
        texts = [[word.replace(".", "").lower() for word in document.split()
                  if word.replace(".", "").lower() not in stoplist]
                 for document in documents]

        # to add remove list for names
        texts_names = [[word.lower() for word in document_name.split()
                       if word.replace(".", "").lower() not in stoplist_names]
                       for document_name in documents_names]

        frequency = defaultdict(int)
        for text in texts:
            for token in text:
                frequency[token] += 1
        texts = [[token for token in text if frequency[token] > 1]
                 for text in texts]

        dictionary = corpora.Dictionary(texts)
        dictionary.save_as_text("dictionary.txt", sort_by_word=False)

        frequency_names = defaultdict(int)
        for text in texts_names:
            for token in text:
                frequency_names[token] += 1
        texts_names = [[token for token in text if frequency_names[token] > 1]
                       for text in texts_names]

        # save to fale keywords sorted by appereance
        dictionary_names = corpora.Dictionary(texts_names)

        print "Created a dictionary of word-bag."
        # doc2bow counts the number of occurences of each distinct word,
        # converts the word to its integer word id and returns the result
        # as a sparse vector
        corpus = [dictionary.doc2bow(text) for text in texts]

        print(corpus)
        # parametar 2: num_topics
        lsi = models.LsiModel(corpus, id2word=dictionary, num_topics=10)
        # parametar 2: num_topics
        corpus_names = [dictionary_names.doc2bow(text) for text in texts_names]
        lsi_names = models.LsiModel(corpus_names, id2word=dictionary_names, num_topics=10)

        j = 0
        for course in courses:
            print "Working on course " + str(j + 1) + " of " + str(course_count)
            doc = course.description
            vec_bow = dictionary.doc2bow(doc.lower().split())

            doc_name = course.name
            vec_bow_name = dictionary_names.doc2bow(doc_name.lower().split())

            # convert the query to LSI space
            vec_lsi = lsi[vec_bow]
            index = similarities.MatrixSimilarity(lsi[corpus])

            vec_lsi_name = lsi_names[vec_bow_name]
            index_name = similarities.MatrixSimilarity(lsi_names[corpus_names])

            # perform a similarity query against the corpus
            sims = index[vec_lsi]
            sims = sorted(enumerate(sims), key=lambda item: -item[1])

            sims_names = index_name[vec_lsi_name]
            sims_names = sorted(enumerate(sims_names), key=lambda item: -item[1])

            j = j + 1
            i = 0
            for similarity in sims:
                if i != 0:
                    # parametar 3: ratio descriptions vs names
                    CourseResult.objects.create(first_course_id=document_courses[sims[0][0]].id,
                                                second_course_id=document_courses[sims[i][0]].id,
                                                result=(0.3 * sims[i][1] + 0.7 * sims_names[i][1]))
                i = i + 1

                # print sims[1:11]
                # print document_courses[sims[1][0]].description
                # print document_courses[sims[2][0]].description
                # print document_courses[sims[3][0]].description

                #    for course_temp in courses:
                #        if course.id != course_temp.id and course_temp not in skip_list:
                #            print "compare"
                #    skip_list.append(course.id)
