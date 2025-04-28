# Backend Mock API

This is a Python Django project serving as a mock CRUD API for benchmarking hot reload in Blazor and Angular clients.

## Running the Backend

1. Ensure you have Python 3.8+ and pip installed.
2. Install Django:
   ```sh
   pip install django
   ```
3. Start the development server:
   ```sh
   python manage.py runserver
   ```
   The API will be available at `http://localhost:8000`.

## CORS

- The backend should allow requests from `http://localhost:4200` (Angular) and `http://localhost:5000` (Blazor) by default for development.

## Endpoints

- `GET /items/`
- `GET /items/<id>/`
- `POST /items/`
- `PUT /items/<id>/`
- `DELETE /items/<id>/`

All endpoints return mock (hardcoded) data.
