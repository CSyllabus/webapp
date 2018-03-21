FROM python:2.7
MAINTAINER Filipe Garcia <filipe.garcia@seedstarslabs.com>

ENV PYTHONUNBUFFERED 1

COPY ./docker/django/django-entrypoint.sh /
COPY ./backend/requirements /django/py-requirements

WORKDIR /django

RUN pip install pip==9.0.1
RUN pip install -r py-requirements/devl.pip

#RUN python
#RUN import nltk
#RUN nltk.download('stopwords')
#RUN exit()


