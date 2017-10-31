from __future__ import unicode_literals
from django.db import models
from .university import University
from .city import City

class Faculty(models.Model):
    name = models.CharField(max_length=255)
    created = models.DateTimeField(editable=False)
    modified = models.DateTimeField()
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()
        self.modified = timezone.now()
        return super(Faculty, self).save(*args, **kwargs)


    def __str__(self):
        return self.name