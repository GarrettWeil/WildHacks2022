from django.contrib import admin

# Register your models here.
from .models import User, PracticeRoom, Checkin

admin.site.register(User)
admin.site.register(PracticeRoom)
admin.site.register(Checkin)
# admin.site.register(BookI nstance)