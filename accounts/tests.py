from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
from .models import CustomUser as User 


# Testing signup and login views

class SignupViewTestCase(TestCase):
    """ Test module for SignupView """
    def setUp(self):
        self.client = Client()
        self.signup_url = reverse('create_user')
        self.UserModel = User

    def test_signup_success(self):
        data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'testPassword123',
            'password2': 'testPassword123',
        }
        response = self.client.post(self.signup_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(self.UserModel.objects.count(), 1)  # 1 user created successfully
        self.assertEqual(self.UserModel.objects.get().username, 'testuser')  # then, get the created user's username
        
    def test_signup_failure(self):
        data = {
            'username': '',
            'email': 'testuser@example.com',
            'password': 'testpassword123',
            'password2': 'testPassword123',
        }
        response = self.client.post(self.signup_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(self.UserModel.objects.count(), 0)

    def test_signup_failure_username_exists(self):
        print("\n3 test cases for signup view, username already exists...")
        data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'testPassword123',
            'password2': 'testPassword123',
        }
        response = self.client.post(self.signup_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(self.UserModel.objects.count(), 1)  # 1st user created successfully
        print("The username 'testuser' created successfully")
        
        data = {
            'username': 'testuser2',
            'email': 'testuser2@example.com',
            'password': '2testPassword123',
            'password2': '2testPassword123',
        }
        response = self.client.post(self.signup_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(self.UserModel.objects.count(), 2)  # 2nd user created successfully
        print("The username 'testuser2' created successfully")
             
        data = {
            'username': 'testuser2',
            'email': 'testuser2@example.com',
            'password': '3testPassword123',
            'password2': '3testPassword123',
        }
        response = self.client.post(self.signup_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(self.UserModel.objects.count(), 2)  # 3rd user with the already existed 'testuser' username was not created
        print("The username 'testuser2' already exists")
    

    def test_signup_failure_passwords_mismatch(self):
        data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'testpassword123',
            'password2': 'testpassword123',
        }
        response = self.client.post(self.signup_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class LoginViewTestCase(TestCase):
    """ Test module for LoginView """
    def setUp(self):
        self.client = Client()
        self.login_url = reverse('token_obtain_pair')
        self.UserModel = User 
        self.user = self.UserModel.objects.create_user(username='testuser',)
        self.user.set_password('testPassword123')
        self.user.save()
    
    # 200: OK, when the request is successful
    
    def test_login_success(self):
        data = {
            'username': 'testuser',
            'password': 'testPassword123',
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('access' in response.data)
        self.assertTrue('refresh' in response.data)
   
    # 401: Unathorized, when the user is not authenticated or the credentials are invalid
    # password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 digit and not contain any spaces or special characters
    # username must not contain any special characters, and must be unique
     
    def test_login_failure(self):
        data = {
            'username': 'testuser',
            'password': 'wrongpassword',
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse('access' in response.data)
        self.assertFalse('refresh' in response.data)

    def test_login_failure_user_not_found(self):
        data = {
            'username': 'unknownuser',
            'password': 'testPassword123',
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse('access' in response.data)
        self.assertFalse('refresh' in response.data)

    def test_login_failure_invalid_username(self):
        data = {
            'username': 'testuser!',
            'password': 'testPassword123',
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse('access' in response.data)
        self.assertFalse('refresh' in response.data)

    # Cases where the password is invalid

    def test_login_failure_invalid_password(self):
        # when password does not contain any numbers
        data = {
            'username': 'testuser',
            'password': 'testPassword'
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse('access' in response.data)
        self.assertFalse('refresh' in response.data)
    
    def test_login_failure_invalid_password2(self):
        # when password contains special characters
        data = {
            'username': 'testuser',
            'password': 'testPassword!'
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse('access' in response.data)
        self.assertFalse('refresh' in response.data)

    def test_login_failure_invalid_username_and_password(self):
        data = {
            'username': 'testuser!',
            'password': 'testPassword'
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse('access' in response.data)
        self.assertFalse('refresh' in response.data)
    
    
    # 400: Bad Request, when the request is invalid, missing required fields, etc.
    
    def test_login_failure_missing_username(self):
        data = {
            'password': 'testPassword123',
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse('access' in response.data)
        self.assertFalse('refresh' in response.data)

    def test_login_failure_missing_password(self):
        data = {
            'username': 'testuser',
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse('access' in response.data)
        self.assertFalse('refresh' in response.data)

    def test_login_failure_missing_username_and_password(self):
        data = {}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse('access' in response.data)
        self.assertFalse('refresh' in response.data)

    def test_login_failure_invalid_username_and_missing_password(self):
        data = {
            'username': 'testuser!',
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse('access' in response.data)
        self.assertFalse('refresh' in response.data)

    def test_login_failure_missing_username_and_invalid_password(self):
        
        data = {
            'password': 'testPassword'
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse('access' in response.data)
        self.assertFalse('refresh' in response.data)


    # Change password, reset password, delete account, etc. tests