from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.exceptions import TokenError

from .serializers import SignupSerializer, MyTokenObtainPairSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


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
            for key, value in serializer.errors.items():
                error_message = str(value[0])
                affected_field = key
            #print(error_message)
            error_info = {'error_message': error_message, 'affected_field': affected_field}
            return JsonResponse(error_info, status=status.HTTP_400_BAD_REQUEST)
    

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