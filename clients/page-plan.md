# Frontend Page Plan for Clients

This document provides detailed specifications for each frontend page.

## Grid Pages
1. Users List (`GET /users/`)
   - Display: ID, Name, Email
   - Features: Pagination, filtering, and sorting
2. Products List (`GET /products/`)
   - Display: ID, Name, Description, Price
   - Features: Pagination, filtering, and sorting
3. Orders List (`GET /orders/`)
   - Display: ID, Product ID, Quantity, Total
   - Features: Pagination, filtering, and sorting
4. Inventory List (`GET /inventory/`)
   - Display: ID, Product ID, Stock
   - Features: Pagination, filtering, and sorting
5. Customers List (`GET /customers/`)
   - Display: ID, Name, Email
   - Features: Pagination, filtering, and sorting

## Form Pages
6. Add Supplier (`POST /suppliers/`)
   - Fields: Name, Contact (email)
   - Features: Two inputs, validation, submit button, success toast
7. Add Invoice (`POST /invoices/`)
   - Fields: Order (dropdown, populated from `/orders/`), Amount, Date (date picker)
   - Features: Validation, submit button, success toast
8. Add Payment (`POST /payments/`)
   - Fields: Invoice (dropdown, populated from `/invoices/`), Amount, Method (select)
   - Features: Validation, submit button, success toast
9. Create Ticket (`POST /tickets/`)
   - Fields: Customer (dropdown, populated from `/customers/`), Issue (textarea)
   - Features: Validation, submit button, success toast
10. New Notification (`POST /notifications/`)
    - Fields: User (dropdown, populated from `/users/`), Message (textarea), Date (picker, defaults to today)
    - Features: Validation, submit button, success toast

## Other Pages
- Home (`/`): Simple hello world page

*This plan is now synchronized with the actual implementation as of April 29, 2025.*

## Layout Requirement
- The app should include a navigation menu (NavMenu) at the top, allowing users to navigate to all pages listed in this plan. This menu should be part of the main layout and visible on all pages.
