from rest_framework.parsers import JSONParser
from rest_framework.views import APIView

from ..models import EventLog
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.decorators import parser_classes
from django.utils import timezone
from django.core import serializers
import datetime

try:
    from django.utils import simplejson as json
except ImportError:
    import json


@permission_classes((permissions.AllowAny,))
@parser_classes((JSONParser,))
class EventLogView(APIView):
    def get(self, request):
        data = {"currentItemCount": 0, 'items': []}
        result = {}
        event_logs = []

        try:
            filter = request.query_params['filter']
        except:
            filter = ""
        try:
            event_type = request.query_params['event_type']
        except:
            event_type = None
        try:
            since_date = request.query_params['since_date']
        except:
            since_date = datetime.date(1970, 1, 1)
        try:
            to_date = request.query_params['to_date']
        except:
            to_date = timezone.now()

        if event_type is not None:
            event_logs = EventLog.objects.filter(event_type=event_type, event_data__contains=filter,
                                                 created__gte=since_date, created__lte=to_date)
        else:
            event_logs = EventLog.objects.filter(event_data__contains=filter,
                                                 created__gte=since_date, created__lte=to_date)
        for event_log in event_logs:
            data['items'].append({'eventType': event_log.event_type, 'event_data': event_log.event_data})

        data['currentItemCount'] = len(event_logs)
        result['data'] = data
        return Response(result)

    def post(self, request):
        event_type = request.data['event_type']
        event_data = request.data['event_data']
        ip = request.META.get('HTTP_X_FORWARDED_FOR', request.META.get('REMOTE_ADDR')).split(',')[-1].strip()

        EventLog.objects.create(event_type=event_type, event_data=event_data, ip=ip)
        return Response()
