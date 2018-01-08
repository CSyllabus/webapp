from __future__ import unicode_literals

from django.utils import timezone

from django.db import models
from .program import Program
from .faculty import Faculty
from .university import University


class Course(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    ects = models.CharField(max_length=255, blank=True, null=True)
    english_level = models.CharField(max_length=255, blank=True, null=True)
    semester = models.CharField(max_length=255, blank=True, null=True)
    level = models.CharField(max_length=255, blank=True, null=True)
    url = models.CharField(max_length=255, blank=True, null=True)
    sync_id = models.CharField(max_length=255, blank=True, null=True)
    keywords = models.TextField()
    created = models.DateTimeField(editable=False)
    modified = models.DateTimeField()

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()
        self.modified = timezone.now()
        return super(Course, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.name)


class CourseProgram(models.Model):
    created = models.DateTimeField(editable=False)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()

        return super(CourseProgram, self).save(*args, **kwargs)


class CourseUniversity(models.Model):
    created = models.DateTimeField(editable=False)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    university = models.ForeignKey(University, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()

        return super(CourseUniversity, self).save(*args, **kwargs)


class CourseFaculty(models.Model):
    created = models.DateTimeField(editable=False)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()

        return super(CourseFaculty, self).save(*args, **kwargs)
