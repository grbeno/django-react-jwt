from datetime import timedelta

from django.utils import timezone
from django.http import JsonResponse

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.exceptions import TokenError

from django_rest_passwordreset.models import ResetPasswordToken
import config.settings as settings
from .models import CustomUser as User

from .serializers import (
    SignupSerializer, 
    ChangePasswordSerializer, 
    MyTokenObtainPairSerializer,
)
from .utils import get_error_message


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

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


class DeleteUser(APIView):
    """ Delete the user account """

    permission_classes = (IsAuthenticated,)

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def delete(self, request, pk, format=None):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class GetTokenExpiry(APIView):
    """ Check if the reset password token is expired or not """
    def get(self, request, *args, **kwargs):

        token = None

        try:
            reset_password_key = ResetPasswordToken.objects.latest('key')
            token=reset_password_key.key
            
            # print(token)
        
        except ResetPasswordToken.DoesNotExist:
            return Response({'error': 'Token does not exist'}, status=400)
        
        try:
            reset_password_token = ResetPasswordToken.objects.get(key=token)
            expiry_time = reset_password_token.created_at + timedelta(seconds=settings.DJANGO_REST_MULTITOKENAUTH_RESET_TOKEN_EXPIRY_TIME)
            
            print(f"\ncreated@: {reset_password_token.created_at}")
            print(f"expire: {expiry_time}\n")
            #print(not timezone.now() <= expiry_time)

        except ResetPasswordToken.DoesNotExist:
            return Response({'error': 'Token does not exist'}, status=400)

        #print(token)
        return JsonResponse({
            'expiry': not timezone.now() <= expiry_time,  # True if expired, False if not expired
            'token': token 
        })