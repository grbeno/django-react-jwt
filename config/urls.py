from django.contrib import admin
from django.urls import path, include

from app.views import React
from accounts.views import BlacklistTokenUpdateView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    
    path('admin/', admin.site.urls),
    path("", include("app.urls")),

    # JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # logout
    path('api/logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),

    # React
    path('', React.as_view(), name='frontend'),

]
