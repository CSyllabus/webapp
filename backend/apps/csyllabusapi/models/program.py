from __future__ import unicode_literals
from django.db import models
from .faculty import Faculty
from .university import University
from .city import City
from .country import Country

class Program(models.Model):
    name = models.CharField(max_length=500)
    study_level = models.CharField(max_length=255)
    created = models.DateTimeField(editable=False)
    modified = models.DateTimeField()

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()
        self.modified = timezone.now()
        return super(Program, self).save(*args, **kwargs)


    def __str__(self):
        return self.name

class ProgramFaculty(models.Model):
    created = models.DateTimeField(editable=False)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()

        return super(ProgramFaculty, self).save(*args, **kwargs)

class ProgramUniversity(models.Model):
    created = models.DateTimeField(editable=False)
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()

        return super(ProgramUniversity, self).save(*args, **kwargs)

class ProgramCity(models.Model):
    created = models.DateTimeField(editable=False)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()

        return super(ProgramCity, self).save(*args, **kwargs)

class ProgramCountry(models.Model):
    created = models.DateTimeField(editable=False)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()

        return super(ProgramCountry, self).save(*args, **kwargs)