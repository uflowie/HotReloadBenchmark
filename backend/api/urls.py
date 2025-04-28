from django.urls import path
from . import views
urlpatterns = [
    path('users/', views.users),
    path('products/', views.products),
    path('orders/', views.orders),
    path('inventory/', views.inventory),
    path('customers/', views.customers),
    path('suppliers/', views.suppliers),
    path('invoices/', views.invoices),
    path('payments/', views.payments),
    path('tickets/', views.tickets),
    path('notifications/', views.notifications),
]
