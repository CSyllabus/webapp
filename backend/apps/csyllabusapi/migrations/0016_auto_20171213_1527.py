# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-13 14:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('csyllabusapi', '0015_auto_20171209_2340'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='firstname',
            new_name='first_name',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='lastname',
            new_name='last_name',
        ),
        migrations.AddField(
            model_name='user',
            name='email',
            field=models.EmailField(default='', error_messages={'unique': 'That email address is already taken.'}, max_length=254, unique=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='user',
            name='is_admin',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='is_anonymous',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='is_authenticated',
            field=models.BooleanField(default=True),
        ),
    ]
