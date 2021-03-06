# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2017-10-30 01:26
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('csyllabusapi', '0005_auto_20171030_0208'),
    ]

    operations = [
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('created', models.DateTimeField(editable=False)),
                ('modified', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('ects', models.CharField(blank=True, max_length=255, null=True)),
                ('english_level', models.CharField(blank=True, max_length=255, null=True)),
                ('semester', models.CharField(blank=True, max_length=255, null=True)),
                ('winsum', models.CharField(blank=True, max_length=255, null=True)),
                ('created', models.DateTimeField(editable=False)),
                ('modified', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Faculty',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('city', models.CharField(blank=True, max_length=255, null=True)),
                ('created', models.DateTimeField(editable=False)),
                ('modified', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Program',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('study_level', models.CharField(max_length=255)),
                ('created', models.DateTimeField(editable=False)),
                ('modified', models.DateTimeField()),
                ('faculty', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='csyllabusapi.Faculty')),
            ],
        ),
        migrations.CreateModel(
            name='TeacherCourse',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(editable=False)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='csyllabusapi.Course')),
            ],
        ),
        migrations.CreateModel(
            name='University',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('created', models.DateTimeField(editable=False)),
                ('modified', models.DateTimeField()),
                ('country', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='csyllabusapi.Country')),
            ],
        ),
        migrations.CreateModel(
            name='UserFaculty',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(editable=False)),
                ('faculty', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='csyllabusapi.Faculty')),
            ],
        ),
        migrations.RemoveField(
            model_name='user',
            name='name',
        ),
        migrations.RemoveField(
            model_name='user',
            name='updated',
        ),
        migrations.AddField(
            model_name='user',
            name='firstname',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='lastname',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2017, 10, 30, 1, 25, 43, 475000, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='password',
            field=models.CharField(default='zaporka', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='username',
            field=models.CharField(default='username', max_length=25, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='user',
            name='created',
            field=models.DateTimeField(editable=False),
        ),
        migrations.AddField(
            model_name='userfaculty',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='csyllabusapi.User'),
        ),
        migrations.AddField(
            model_name='teachercourse',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='csyllabusapi.User'),
        ),
        migrations.AddField(
            model_name='faculty',
            name='university',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='csyllabusapi.University'),
        ),
        migrations.AddField(
            model_name='course',
            name='program',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='csyllabusapi.Program'),
        ),
    ]
