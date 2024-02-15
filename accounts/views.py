from django.http import JsonResponse

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.exceptions import TokenError

from django_rest_passwordreset.views import ResetPasswordConfirm, ResetPasswordRequestToken

from .serializers import (
    SignupSerializer, 
    ChangePasswordSerializer, 
    MyTokenObtainPairSerializer, 
    CustomPasswordTokenSerializer,
    CustomEmailSerializer
)
from .models import CustomUser as User
from config.settings import EMAIL_HOST_USER
from .utils import get_error_message


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# django_rest_passwordreset views

class MyPasswordTokenView(ResetPasswordConfirm):
    serializer_class = CustomPasswordTokenSerializer


class MyResetPasswordTokenView(ResetPasswordRequestToken):
    serializer_class = CustomEmailSerializer


# .accounts views
        
class SignupView(APIView):
    """ Create a new user """

    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User created successfully", "user": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            # Error messages
            error_info = get_error_message(serializer)
            return JsonResponse(error_info, status=status.HTTP_400_BAD_REQUEST)
        

class ChangePasswordView(APIView):
    """ Change the user's password """

    permission_classes = (IsAuthenticated,)

    def post(self, request):
        user = request.user
        serializer = ChangePasswordSerializer(data=request.data, context={"request": request})

        if serializer.is_valid():            
            # Set the new password
            user.set_password(serializer.data.get("new_password"))
            user.save()
            return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)

        # Check old password
        old_password = serializer.data.get("old_password")
        if not user.check_password(old_password) and len(old_password) > 0:
            error_info = {'error_message': 'Wrong password.', 'affected_field': 'old_password'}
            return Response(error_info, status=status.HTTP_400_BAD_REQUEST)
        
        # Error messages
        error_info = get_error_message(serializer, more_affected_fields=True)
        return Response(error_info, status=status.HTTP_400_BAD_REQUEST)


# CUSTOM RESET PASSWORD

# class ResetPasswordView(APIView):
#     """ Reset the user's password """

#     permission_classes = (AllowAny,)

#     def post(self, request):  
#         serializer = ResetPasswordSerializer(data=request.data, context={"request": request})
#         if serializer.is_valid():
#             user = User.objects.filter(email=request.data.get('email')).first()
#             email = request.data.get('email')
#             #uid = urlsafe_base64_encode(force_bytes(user.pk))
#             # Generate a token for the user
#             token = default_token_generator.make_token(user)
#             # Send the reset link with the token to the user
#             send_mail(
#                 'Password reset',
#                 #f'Click the link to reset your password: http://{request.get_host()}/set_new_password/',
#                 f"Click the link to reset your password: http://{request.get_host()}/accounts/email/set_new_password/{token}",
#                 EMAIL_HOST_USER,
#                 [email],
#                 fail_silently=False,
#             )
#             return Response({"message": "Password reset link sent successfully"}, status=status.HTTP_200_OK)
#         else:
#             return Response(get_error_message(serializer), status=status.HTTP_400_BAD_REQUEST)
        
#         # error_info = get_error_message(serializer)
#         # return Response(error_info, status=status.HTTP_400_BAD_REQUEST)


class BlacklistTokenUpdateView(APIView):
    """ Blacklist the refresh token when the user logs out """
    
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        refresh_token = request.data["refresh_token"]
        try:
            RefreshToken(refresh_token).blacklist()
        except TokenError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(status=status.HTTP_205_RESET_CONTENT)


class IsSuperuser(APIView):
    """ Check if the user is superuser or not """
    
    def get(self, request):
        user = request.user
        is_superuser = user.is_superuser
        return JsonResponse({'is_superuser': is_superuser})