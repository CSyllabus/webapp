from __future__ import unicode_literals
from django.db import models
from django.utils import timezone
from .course import Course
from .faculty import Faculty

class UserCoursePost(models.Model):
    content = models.TextField()
    author = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    created = models.DateTimeField(editable=False)
    modified = models.DateTimeField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    show = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()
        self.modified = timezone.now()
        return super(UserCoursePost, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.content) + " " + str(self.course)


class UserFacultyPost(models.Model):
    content = models.TextField()
    type = models.CharField(max_length=255)
    created = models.DateTimeField(editable=False)
    modified = models.DateTimeField()
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()
        self.modified = timezone.now()
        return super(UserFacultyPost, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.content) + " " + str(self.faculty)