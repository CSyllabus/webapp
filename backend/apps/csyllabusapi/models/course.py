from __future__ import unicode_literals
from django.db import models
from .program import Program

class Course(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    ects = models.CharField(max_length=255, blank = True,null = True)
    english_level = models.CharField(max_length=255, blank = True,null = True)
    semester = models.CharField(max_length=255, blank = True,null = True)
    winsum = models.CharField(max_length=255, blank = True,null = True)
    created = models.DateTimeField(editable=False)
    modified = models.DateTimeField()
    program = models.ForeignKey(Program, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()
        self.modified = timezone.now()
        return super(Course, self).save(*args, **kwargs)


    def __str__(self):
        return self.name