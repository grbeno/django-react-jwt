from django.contrib import admin
from django.urls import path, include
from app.views import React


urlpatterns = [
    
    path('admin/', admin.site.urls),
    path("", include("app.urls")),

    # React
    path('', React.as_view(), name='frontend'),

]
