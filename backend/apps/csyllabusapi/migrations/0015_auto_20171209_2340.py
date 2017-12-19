# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-09 22:40
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('csyllabusapi', '0014_courseresult'),
    ]

    operations = [
        migrations.CreateModel(
            name='CourseFaculty',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(editable=False)),
            ],
        ),
        migrations.CreateModel(
            name='CourseUniversity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(editable=False)),
            ],
        ),
        migrations.RenameField(
            model_name='course',
            old_name='winsum',
            new_name='level',
        ),
        migrations.AddField(
            model_name='course',
            name='keywords',
            field=models.TextField(default=' '),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='course',
            name='url',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='courseuniversity',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='csyllabusapi.Course'),
        ),
        migrations.AddField(
            model_name='courseuniversity',
            name='university',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='csyllabusapi.University'),
        ),
        migrations.AddField(
            model_name='coursefaculty',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='csyllabusapi.Course'),
        ),
        migrations.AddField(
            model_name='coursefaculty',
            name='faculty',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='csyllabusapi.Faculty'),
        ),
    ]