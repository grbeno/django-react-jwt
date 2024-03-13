
# <div align="center"> Django-React template/start project with JWT authentication</div>
<br>

> The goal of this repository is to provide a basic template or a starting point for a Django web application, using React as the frontend. If you find it useful, you can download the zip file and start your own project. 
---

### Features
:clipboard: ``` Custom User Model ``` :raising_hand: ``` Sign up ``` :unlock: ``` Sign in ``` :key: ``` JWT authentication ``` :arrows_clockwise: ``` Change password ``` :white_check_mark: ``` Reset password ``` :x: ``` Delete User ```

### Stack
``` Django ``` ``` Django REST framework``` ``` ReactJS ``` ``` PostgreSQL ``` ``` Bootstrap ``` ``` CSS ```

### Variables
```
# .env

SECRET_KEY=<django_secret_key>
DEBUG=True
DATABASE_URL=postgres://postgres:<db_password>@localhost:5432/<db_name>
SSL_REQUIRE=False
EMAIL_USER=<email_address>
EMAIL_PASSWORD=<email_password>
REACT_APP_BASE_URL=http://localhost:8000
```

## Getting Started
#### Download the zip file
#### Install the required python libraries and packages:
```
pipenv install -r requirements.txt
```
#### Create postgres database on your local system
#### Download & install postgres
#### Create database:
```
psql -U postgres
```
```
CREATE DATABASE <db_name> WITH OWNER postgres;
```
#### Migrate the models to database & run collectstatic for the static files:
```
pipenv shell
```
```
python manage.py migrate
```
#### Install node modules and build:
```
npm install
```
```
npm run build
```
#### Run on localhost:
```
python manage.py runserver
```
#### Finally, initialize your own git repo and commit/push to github

