# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-14 05:42
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('csyllabusapi', '0012_programcity_programcountry'),
    ]

    operations = [
        migrations.AddField(
            model_name='city',
            name='img',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='country',
            name='img',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='faculty',
            name='img',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='university',
            name='img',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]