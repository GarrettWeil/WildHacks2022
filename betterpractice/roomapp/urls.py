from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('/covid', views.notifyCovid),
    path('/checkin', views.checkin),
    path('/checkout', views.checkout),
    path('/redirect/<slug:room>/', views.redirect_),
    path('/bulkroomstatus', views.bulk_room_status)
]