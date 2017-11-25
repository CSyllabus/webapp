from __future__ import unicode_literals
from django.db import models
from .course import Course

import datetime
from django.utils import timezone
class CourseResult(models.Model):
    first_course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='+')
    second_course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='+')
    result = models.CharField(max_length=255, blank=True, null=True)
    created = models.DateTimeField(editable=False)
    modified = models.DateTimeField()

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()
        self.modified = timezone.now()
        return super(CourseResult, self).save(*args, **kwargs)