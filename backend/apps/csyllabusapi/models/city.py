from __future__ import unicode_literals
from django.db import models
from django.utils import timezone
from .country import Country

class City(models.Model):
    name = models.CharField(max_length=255)
    img = models.CharField(max_length=255, blank = True,null = True)
    created = models.DateTimeField(editable=False)
    modified = models.DateTimeField()
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()
        self.modified = timezone.now()
        return super(City, self).save(*args, **kwargs)


    def __str__(self):
        return str(self.name)