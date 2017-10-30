from __future__ import unicode_literals
from django.db import models

class Country(models.Model):
    name = models.CharField(max_length=255)
    created = models.DateTimeField(editable=False)
    modified = models.DateTimeField()

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()
        self.modified = timezone.now()
        return super(Country, self).save(*args, **kwargs)


    def __str__(self):
        return self.name