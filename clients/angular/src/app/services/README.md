# API Service for Angular Client

This service provides methods to communicate with the backend API as specified in the OpenAPI specification.

## Usage

1. Import the `ApiService` in your component:

```typescript
import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: User[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.apiService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  createUser(user: User): void {
    this.apiService.createUser(user).subscribe({
      next: (newUser) => {
        this.users.push(newUser);
      },
      error: (error) => {
        console.error('Error creating user:', error);
      }
    });
  }
}
```

## Available Methods

The service provides methods for all endpoints defined in the OpenAPI specification:

### Users
- `getUsers()`: Get all users
- `createUser(user: User)`: Create a new user

### Products
- `getProducts()`: Get all products
- `createProduct(product: Product)`: Create a new product

### Orders
- `getOrders()`: Get all orders
- `createOrder(order: Order)`: Create a new order

### Inventory
- `getInventoryItems()`: Get all inventory items
- `createInventoryItem(item: InventoryItem)`: Create a new inventory item

### Customers
- `getCustomers()`: Get all customers
- `createCustomer(customer: Customer)`: Create a new customer

### Suppliers
- `getSuppliers()`: Get all suppliers
- `createSupplier(supplier: Supplier)`: Create a new supplier

### Invoices
- `getInvoices()`: Get all invoices
- `createInvoice(invoice: Invoice)`: Create a new invoice

### Payments
- `getPayments()`: Get all payments
- `createPayment(payment: Payment)`: Create a new payment

### Tickets
- `getTickets()`: Get all tickets
- `createTicket(ticket: Ticket)`: Create a new ticket

### Notifications
- `getNotifications()`: Get all notifications
- `createNotification(notification: Notification)`: Create a new notification
