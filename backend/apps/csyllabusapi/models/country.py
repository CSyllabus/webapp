from __future__ import unicode_literals
from django.utils import timezone
from django.db import models

class Country(models.Model):
    name = models.CharField(max_length=255)
    img = models.CharField(max_length=255, blank = True,null = True)
    created = models.DateTimeField(editable=False)
    modified = models.DateTimeField()

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()

        self.modified = timezone.now()
        return super(Country, self).save(*args, **kwargs)


    def __str__(self):
        return str(self.name)