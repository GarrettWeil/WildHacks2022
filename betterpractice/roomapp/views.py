from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from .models import User
from .models import Checkin
from datetime import datetime, timedelta


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def notifyCovid(request):
    if request.method != 'POST':
        return HttpResponse(status=400)
    user_token = request.headers['Authorization']
    user_netid = User.get_netid_from_token(user_token)
    try:
        actualUser = User.objects.get(netid__exact=user_netid)
    except User.DoesNotExist:
        return HttpResponse(status=404)
    covid_period = 72
    last_date = datetime.now() - timedelta(hours=covid_period)
    check_ins = Checkin.objects.filter(user=actualUser, checkin_time__range=(last_date, datetime.now())).query
    print(check_ins)
    rooms = []

    return HttpResponse(actualUser.email)
