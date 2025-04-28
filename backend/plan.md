# Backend Implementation Plan

This plan outlines how to build a Django-based mock API that returns hardcoded data without using a database.

## 1. Dependencies
- Python 3.8+
- Django
- django-cors-headers (for CORS handling)

## 2. Project & App Setup
1. Run:
   ```bash
   django-admin startproject backend
   cd backend
   python manage.py startapp api
   ```
2. Install dependencies:
   ```bash
   pip install django django-cors-headers
   ```
3. Add `corsheaders` and `api` to `INSTALLED_APPS` in `backend/settings.py`.
4. Configure CORS in `settings.py`:
   ```python
   MIDDLEWARE = [
     'corsheaders.middleware.CorsMiddleware',
     ...
   ]
   CORS_ALLOWED_ORIGINS = [
     'http://localhost:4200',  # Angular client
     'http://localhost:5000',  # Blazor client
   ]
   ```

## 3. Directory Structure
```
backend/
├── api/
│   ├── mocks.py         # Hardcoded data for each resource
│   ├── views.py         # GET and POST view functions
│   ├── urls.py          # URL route mappings
│   └── __init__.py
├── backend/
│   ├── settings.py
│   ├── urls.py          # Include `api.urls`
│   └── wsgi.py
└── manage.py
```

## 4. Define Mock Data
In `api/mocks.py`, define lists/dicts for each resource, e.g.:
```python
USERS = [
  {'id': 1, 'name': 'Alice', 'email': 'alice@example.com'},
  ...
]
PRODUCTS = [ ... ]
# etc. for orders, inventory, customers, suppliers, invoices, payments, tickets, notifications
```

## 5. Implement Views
In `api/views.py`:
- `list_<resource>(request)`: return `JsonResponse(<RESOURCE_LIST>, safe=False)` on GET
- `create_<resource>(request)`: parse `json.loads(request.body)`, assign new `id`, append to list, return `JsonResponse(new_item, status=201)` on POST

## 6. URL Routing
In `api/urls.py`:
```python
from django.urls import path
from . import views
urlpatterns = [
  path('users/', views.list_users),
  path('users/', views.create_user),
  # Repeat for products, orders, ... notifications
]
```
Then include in `backend/urls.py`:
```python
path('', include('api.urls'))
```

## 7. Run & Test
- Start server: `python manage.py runserver`
- Test endpoints via browser or curl:
  - `GET http://localhost:8000/users/`
  - `POST http://localhost:8000/users/` with JSON body

---
*This simple plan ensures a lightweight mock Django API, no database needed, ready for hot reload benchmarking.*
