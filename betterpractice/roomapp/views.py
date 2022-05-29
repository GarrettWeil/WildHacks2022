from django.db.models import Max
from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from .models import User
from .models import Checkin, PracticeRoom
from datetime import datetime, timedelta
from django.utils import timezone

import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from django.shortcuts import redirect
import json


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
    user_emails = list(map(lambda user: user.email, users))

    message = Mail(
        from_email='peterzhong2023@u.northwestern.edu',
        to_emails=user_emails,
        subject='Covid Notification From Better Practice',
        html_content='<strong>Our records indicate that you have used a practice room '
                     'recently occupied by another student who tested positive. </strong>',
        is_multiple=True)
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e.message)

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

    checkin_period = 24

    room = PracticeRoom.objects.get(room_name__exact=request.POST['room'])
    last_checkout = Checkin.objects.filter(room=room).order_by('-checkout_time').first()

    if last_checkout is not None and last_checkout.checkout_time > timezone.now():
        last_checkout.checkout_time = timezone.now()
        last_checkout.save()

    new_checkin = Checkin.objects.create(user=actualUser, room=room, checkin_time=timezone.now(),
                                         checkout_time=timezone.now()+ timedelta(hours=checkin_period))

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
    room = PracticeRoom.objects.get(room_name__exact=request.POST['room'])
    updated_checkout = Checkin.objects.filter(room=room).order_by('-checkin_time').first()

    updated_checkout.checkout_time = timezone.now()
    updated_checkout.save()

    return HttpResponse("Checkout request sent")


@csrf_exempt
def login(request):
    if request.method != 'POST':
        return HttpResponse(status=400)
    # print(request.POST)
    netid = request.POST['callback_0']
    userexist = User.objects.filter(netid=netid).exists()
    return redirect(f"/static/main.html?userexist={userexist}&token={netid}")


@csrf_exempt
def bulk_room_status(request):
    rooms_raw = request.body.decode('utf-8')
    rooms = json.loads(rooms_raw)
    practiceRooms = PracticeRoom.objects.filter(room_name__in=rooms)
    checkins = Checkin.objects.values("room__room_name").annotate(time=Max('checkout_time'))
    room_status = {}
    for room in rooms:
        room_status[room] = 'NeverBooked'
    for checkin in checkins:
        room_status[checkin['room__room_name']] = checkin['time']
    from django.core.serializers.json import DjangoJSONEncoder
    return HttpResponse(json.dumps(room_status, cls=DjangoJSONEncoder))






# Checkin.objects.values("room__room_name").annotate(time=Max('checkout_time')).first()

# {'room__room_name': 'room1', 'time': datetime.datetime(2022, 5, 28, 23, 5, 11, 951686, tzinfo=datetime.timezone.utc)}
