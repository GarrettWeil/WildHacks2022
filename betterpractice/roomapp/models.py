from django.db import models
import datetime



class User(models.Model):
    netid = models.CharField(max_length=200, primary_key=True)
    email = models.EmailField()

    @staticmethod
    def get_netid_from_token(token):
        return token

class PracticeRoom(models.Model):
    room_name = models.CharField(max_length=200)


class Checkin(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(PracticeRoom, on_delete=models.CASCADE)
    checkin_time = models.DateTimeField()
    checkout_time = models.DateTimeField()