# accounts.urls
from django.urls import path
from .views import IsSuperuser, ChangePasswordView, SignupView


urlpatterns = [
    path('signup/', SignupView.as_view(), name="create_user"),
    path('change_password/', ChangePasswordView.as_view(), name="change_password"),
    path('is_superuser/', IsSuperuser.as_view(), name="is_superuser"),
]