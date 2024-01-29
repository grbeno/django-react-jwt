from .views import home
from django.urls import path
from .views import ChatAPI


urlpatterns = [
    
    #path("", home, name="home"),  # Django home page
    path('api/chat/', ChatAPI.as_view(), name='chat'),
    
]