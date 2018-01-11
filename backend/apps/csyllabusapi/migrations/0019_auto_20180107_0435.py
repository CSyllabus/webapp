# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-01-07 09:35
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('csyllabusapi', '0018_auto_20171216_2357'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='adminuniversity',
            name='faculty',
        ),
        migrations.AddField(
            model_name='adminuniversity',
            name='university',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='csyllabusapi.University'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='usercoursepost',
            name='author',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
    ]