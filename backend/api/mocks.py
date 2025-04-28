USERS = [
    {"id": 1, "name": "Alice", "email": "alice@example.com"},
    {"id": 2, "name": "Bob", "email": "bob@example.com"}
]
PRODUCTS = [
    {"id": 1, "name": "Widget", "description": "A useful widget", "price": 9.99},
    {"id": 2, "name": "Gadget", "description": "A fancy gadget", "price": 19.99}
]
ORDERS = [
    {"id": 1, "productId": 1, "quantity": 2, "total": 19.98},
    {"id": 2, "productId": 2, "quantity": 1, "total": 19.99}
]
INVENTORY = [
    {"id": 1, "productId": 1, "stock": 100},
    {"id": 2, "productId": 2, "stock": 50}
]
CUSTOMERS = [
    {"id": 1, "name": "Charlie", "email": "charlie@example.com"},
    {"id": 2, "name": "Dana", "email": "dana@example.com"}
]
SUPPLIERS = [
    {"id": 1, "name": "Acme Corp", "contact": "acme@example.com"},
    {"id": 2, "name": "Globex Inc", "contact": "globex@example.com"}
]
INVOICES = [
    {"id": 1, "orderId": 1, "amount": 19.98, "date": "2023-01-01"},
    {"id": 2, "orderId": 2, "amount": 19.99, "date": "2023-01-02"}
]
PAYMENTS = [
    {"id": 1, "invoiceId": 1, "amount": 19.98, "method": "Credit Card"},
    {"id": 2, "invoiceId": 2, "amount": 19.99, "method": "PayPal"}
]
TICKETS = [
    {"id": 1, "customerId": 1, "issue": "Cannot login", "status": "open"},
    {"id": 2, "customerId": 2, "issue": "Order not received", "status": "closed"}
]
NOTIFICATIONS = [
    {"id": 1, "userId": 1, "message": "Welcome!", "date": "2023-01-01"},
    {"id": 2, "userId": 2, "message": "Your order shipped", "date": "2023-01-02"}
]
