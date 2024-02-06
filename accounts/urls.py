# accounts.urls
from django.urls import path
from .views import IsSuperuser, SignupView


urlpatterns = [
    path('signup/', SignupView.as_view(), name="create_user"),
    path('is_superuser/', IsSuperuser.as_view(), name="is_superuser"),
]