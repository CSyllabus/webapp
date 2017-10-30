from __future__ import unicode_literals
from django.db import models
from .faculty import Faculty

class Program(models.Model):
    name = models.CharField(max_length=255)
    study_level = models.CharField(max_length=255)
    created = models.DateTimeField(editable=False)
    modified = models.DateTimeField()
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()
        self.modified = timezone.now()
        return super(Program, self).save(*args, **kwargs)


    def __str__(self):
        return self.name