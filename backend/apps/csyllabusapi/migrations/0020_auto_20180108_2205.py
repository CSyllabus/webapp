# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-01-08 21:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('csyllabusapi', '0019_auto_20180107_0435'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usercoursepost',
            name='show',
            field=models.BooleanField(default=True),
        ),
    ]