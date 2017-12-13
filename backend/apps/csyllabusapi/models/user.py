from __future__ import unicode_literals
from django.db import models
from django.utils import timezone
from .faculty import Faculty
from .course import Course

from django.contrib.auth.models import (AbstractBaseUser, PermissionsMixin,
                                        BaseUserManager)




class UserManager(BaseUserManager):
    def _create_user(self, username, password, is_admin,
                     **extra_fields):
        now = timezone.now()

        if not username:
            raise ValueError('The given username must be set')

        username = self.normalize_email(username)

        user = self.model(
            username=username,
            is_admin=is_admin,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, username, password, **extra_fields):

        return self._create_user(
            username,
            password,
            False,
            **extra_fields
        )

    def create_superuser(self, username, password, **extra_fields):
        return self._create_user(
            username, password,
            True,
            **extra_fields
        )

class User(PermissionsMixin, AbstractBaseUser ):
    username = models.CharField(max_length=25, unique = True)
    password = models.CharField(max_length=100)
    first_name = models.CharField(max_length=50, blank = True, null= True)
    last_name = models.CharField(max_length=50, blank = True, null= True)
    email = models.EmailField(
        max_length=254,
        unique=True,
        error_messages={
            'unique': 'That email address is already taken.'
        }
    )
    is_admin = models.BooleanField(default= False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    last_login = models.DateTimeField(auto_now_add=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True, blank=True)

    created = models.DateTimeField(editable=False)
    modified = models.DateTimeField()

    objects = UserManager()
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()
            self.date_joined = timezone.now()
            self.last_login = timezone.now()
        self.modified = timezone.now()
        return super(User, self).save(*args, **kwargs)


    def __str__(self):
        return self.name

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name']

class UserFaculty(models.Model):
    created = models.DateTimeField(editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()

        return super(UserFaculty, self).save(*args, **kwargs)


    def __str__(self):
        return self.name


class TeacherCourse(models.Model):
    created = models.DateTimeField(editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()

        return super(TeacherCourse, self).save(*args, **kwargs)

    def __str__(self):
        return self.name