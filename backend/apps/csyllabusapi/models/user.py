from __future__ import unicode_literals
from django.db import models
from django.utils import timezone
from .faculty import Faculty
from .course import Course

class User(models.Model):
    username = models.CharField(max_length=25, unique = True)
    password = models.CharField(max_length=100)
    firstname = models.CharField(max_length=50, blank = True, null= True)
    lastname = models.CharField(max_length=50, blank = True, null= True)
    created = models.DateTimeField(editable=False)
    modified = models.DateTimeField()

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()
        self.modified = timezone.now()
        return super(User, self).save(*args, **kwargs)


    def __str__(self):
        return self.name

class UserFaculty(models.Model):
    created = models.DateTimeField(editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()

        return super(UserFaculty, self).save(*args, **kwargs)


    def __str__(self):
        return self.name


class TeacherCourse(models.Model):
    created = models.DateTimeField(editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()

        return super(TeacherCourse, self).save(*args, **kwargs)

    def __str__(self):
        return self.name