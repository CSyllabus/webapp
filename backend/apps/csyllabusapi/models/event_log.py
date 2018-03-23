from __future__ import unicode_literals
from django.db import models
from django.utils import timezone


class EventLog(models.Model):
    event_type = models.CharField(max_length=255)
    ip = models.CharField(max_length=255, blank=True, null=True)
    event_data = models.TextField(blank=True, null=True)
    created = models.DateTimeField(editable=False)
    modified = models.DateTimeField()

    def save(self, *args, **kwargs):
        """ On save, update timestamps """
        if not self.id:
            self.created = timezone.now()
        self.modified = timezone.now()
        return super(EventLog, self).save(*args, **kwargs)
