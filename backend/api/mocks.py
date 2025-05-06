import random
from datetime import datetime, timedelta

NUM_ITEMS = 50

today = datetime.now()

# Users
USERS = [
    {"id": 1, "name": "Admin User", "email": "admin@admin.com"},
    *[
        {"id": i, "name": f"User {i}", "email": f"user{i}@example.com"}
        for i in range(2, NUM_ITEMS + 1)
    ]
]

# Products
PRODUCTS = [
    {
        "id": i,
        "name": f"Product {i}",
        "description": f"Description for product {i}",
        "price": round(5 + i * 1.5, 2)
    }
    for i in range(1, NUM_ITEMS + 1)
]

# Orders
ORDERS = [
    {
        "id": i,
        "productId": random.randint(1, NUM_ITEMS),
        "quantity": random.randint(1, 5),
        "total": round(random.randint(1, 5) * random.uniform(5.0, 100.0), 2)
    }
    for i in range(1, NUM_ITEMS + 1)
]

# Inventory
INVENTORY = [
    {
        "id": i,
        "productId": i,
        "stock": random.randint(0, 200)
    }
    for i in range(1, NUM_ITEMS + 1)
]

# Customers
CUSTOMERS = [
    {"id": 1, "name": "Admin Customer", "email": "admin@admin.com"},
    *[
        {"id": i, "name": f"Customer {i}", "email": f"customer{i}@example.com"}
        for i in range(2, NUM_ITEMS + 1)
    ]
]

# Suppliers
SUPPLIERS = [
    {"id": i, "name": f"Supplier {i}", "contact": f"supplier{i}@example.com"}
    for i in range(1, NUM_ITEMS + 1)
]

# Invoices
INVOICES = [
    {
        "id": i,
        "orderId": random.randint(1, NUM_ITEMS),
        "amount": round(random.uniform(10.0, 1000.0), 2),
        "date": (today - timedelta(days=random.randint(0, 365))).strftime("%Y-%m-%d")
    }
    for i in range(1, NUM_ITEMS + 1)
]

# Payments
METHODS = ["Credit Card", "PayPal", "Bank Transfer"]
PAYMENTS = [
    {
        "id": i,
        "invoiceId": random.randint(1, NUM_ITEMS),
        "amount": round(random.uniform(10.0, 1000.0), 2),
        "method": random.choice(METHODS)
    }
    for i in range(1, NUM_ITEMS + 1)
]

# Tickets
STATUSES = ["open", "closed", "pending"]
TICKETS = [
    {
        "id": i,
        "customerId": random.randint(1, NUM_ITEMS),
        "issue": f"Issue description {i}",
        "status": random.choice(STATUSES)
    }
    for i in range(1, NUM_ITEMS + 1)
]

# Notifications
NOTIFICATIONS = [
    {
        "id": i,
        "userId": random.randint(1, NUM_ITEMS),
        "message": f"Notification {i}",
        "date": (today - timedelta(days=random.randint(0, 365))).strftime("%Y-%m-%d")
    }
    for i in range(1, NUM_ITEMS + 1)
]
