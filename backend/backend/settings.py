import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SECRET_KEY = 'mock-key-for-benchmark'
DEBUG = True
ALLOWED_HOSTS = ['*']
INSTALLED_APPS = [
    'django.contrib.contenttypes',
    'django.contrib.staticfiles',
    'corsheaders',
    'api',
]
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]
ROOT_URLCONF = 'backend.urls'
TEMPLATES = []
WSGI_APPLICATION = 'backend.wsgi.application'
CORS_ALLOWED_ORIGINS = [
    'http://localhost:4200',
    'http://localhost:5000',
]
STATIC_URL = '/static/'
USE_TZ = True
TIME_ZONE = 'UTC'
DATABASES = {}
