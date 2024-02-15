# accounts.urls
from django.urls import path
from .views import IsSuperuser, ChangePasswordView, SignupView #, ResetPasswordView, SetNewPasswordView

urlpatterns = [
    path('signup/', SignupView.as_view(), name="create_user"),
    path('change_password/', ChangePasswordView.as_view(), name="change_password"),
    #path('password_reset/', ResetPasswordView.as_view(), name="password_reset"),
    path('is_superuser/', IsSuperuser.as_view(), name="is_superuser"),
    #path('set_new_password/', SetNewPasswordView.as_view(), name="set_new_password"),
]