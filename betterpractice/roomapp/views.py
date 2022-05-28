from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from .models import User
from .models import Checkin, PracticeRoom
from datetime import datetime, timedelta
from django.utils import timezone

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
    last_date = timezone.now() - timedelta(hours=covid_period)
    check_ins = Checkin.objects.filter(user=actualUser, checkout_time__range=(last_date, timezone.now()))
    users = set()
    for checkin in check_ins:
        checkout_time = checkin.checkout_time
        room = checkin.room
        other_checkins = Checkin.objects.filter(room=room, checkin_time__gt=checkout_time)
        for othercheckin in other_checkins:
            users.add(othercheckin.user)
    users = list(users)
    print(users[0].email)
    return HttpResponse(actualUser.email)

@csrf_exempt
def checkin(request):

    if request.method != 'POST':
        return HttpResponse(status=400)
    user_token = request.headers['Authorization']
    user_netid = User.get_netid_from_token(user_token)
    try:
        actualUser = User.objects.get(netid__exact=user_netid)
    except User.DoesNotExist:
        return HttpResponse(status=404)

    room = PracticeRoom.objects.get(room_name__exact = request.POST['room'])
    new_checkin = Checkin.objects.create(user=actualUser, \
                                         room=room, \
                                         checkin_time=datetime.now(), \
                                         checkout_time = datetime.now() + timedelta(hours=24))


    return HttpResponse("Checkin request sent")

@csrf_exempt
def checkout(request):

    if request.method != 'POST':
        return HttpResponse(status=400)
    user_token = request.headers['Authorization']
    user_netid = User.get_netid_from_token(user_token)
    try:
        actualUser = User.objects.get(netid__exact=user_netid)
    except User.DoesNotExist:
        return HttpResponse(status=404)

    updated_checkout = Checkin.objects.filter(room_name__exact=request.POST['room']).orderby('-checkin_time')

    updated_checkout.checkout_time = datetime.now()
    updated_checkout.save()

    return HttpResponse("Checkout request sent")






