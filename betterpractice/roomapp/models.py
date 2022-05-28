from django.db import models


class User(models.Model):
    netid = models.CharField(max_length=200)
    email = models.EmailField()



class PracticeRoom(models.Model):
    room_name = models.CharField(max_length=200)


class Checkin(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(PracticeRoom, on_delete=models.CASCADE)
    checkin_time = models.DateTimeField()