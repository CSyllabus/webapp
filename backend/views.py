import json

from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.core.urlresolvers import reverse
from django.shortcuts import render, redirect

def index(request):

    template = 'backend/app.html'
    return render(request, template)


def app(request):

    template = 'backend/app.html'
    return render(request, template)