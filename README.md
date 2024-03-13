
## Django-React template/start project with JWT authentication

> **_NOTE:_** The goal of this repository is to provide a basic template or a starting point for a Django web application, using React as the frontend. If you find it useful, you can download the zip file and start your own project. 
---

### Features
:clipboard: ``` Custom User Model ``` :raising_hand: ``` Sign up ``` :unlock: ``` Sign in ``` :key: ``` JWT authentication ``` :arrows_clockwise: ``` Change password ``` :white_check_mark: ``` Reset password ``` :x: ``` Delete User ```

### Stack
``` Django ``` ``` Django REST framework``` ``` ReactJS ``` ``` PostgreSQL ``` ``` Bootstrap ``` ``` CSS ```

### Getting Started
---
- Download the zip file
- Create your own virtual environment on your project directory and install the required libraries/packages. (pipenv) 

  - ```$ pipenv install -r requirements.txt```

- Create postgres database on your local system

  - ``` # Download & install postgres ```
  - ``` psql -U postgres ```
  - ``` CREATE DATABASE <db_name> WITH OWNER postgres; ```

- Create .env file that includes DEBUG, SECRET_KEY, SSL_REQUIRE, DATABASE_URL values

  - ``` # Generate secret key ```
  - ``` $ python -c 'import secrets;print(secrets.token_urlsafe())' ```
  - ``` DATABASE_URL=postgres://postgres:<password>@localhost:5432/<database> ```

- Migrate the models to database & run collectstatic for the static files

  - ``` $ pipenv shell ```
  - ``` $ python manage.py migrate ```
  - ``` $ python manage.py collectstatic --noinput ```

- Install node modules and build

  -  ``` $ npm install ```
  -  ``` $ npm run build ```
    
- Run on localhost
  -  ``` $ python manage.py runserver ```
  
- Initialize your own git repo and commit/push to github

### Deploying
---
