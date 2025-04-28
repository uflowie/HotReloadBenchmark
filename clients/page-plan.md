# Frontend Page Plan for Clients

This document provides detailed specifications for each page in both Blazor and Angular clients.

## Grid Pages
1. Users List (`GET /users/`)
   - Display: ID, Name, Email
   - Features: pagination and search filter
2. Products List (`GET /products/`)
   - Display: ID, Name, Description, Price
   - Features: column sorting
3. Orders List (`GET /orders/`)
   - Display: ID, Product ID, Quantity, Total
   - Features: paging and refresh button
4. Inventory List (`GET /inventory/`)
   - Display: ID, Product ID, Stock
   - Features: conditional styling based on stock levels
5. Customers List (`GET /customers/`)
   - Display: ID, Name, Email
   - Features: inline row selection

## Form Pages
6. Add Supplier (`POST /suppliers/`)
   - Fields: Name, Contact (email)
   - Layout: two inputs with validation messages and submit button
7. Add Invoice (`POST /invoices/`)
   - Fields: Order (dropdown), Amount, Date (date picker)
   - Behavior: dropdown populated from `/orders/` API
8. Add Payment (`POST /payments/`)
   - Fields: Invoice (dropdown), Amount, Method (select)
   - Behavior: fetch invoices for dropdown via `/invoices/`
9. Create Ticket (`POST /tickets/`)
   - Fields: Customer (dropdown), Issue (textarea)
   - Behavior: show success toast on submit
10. New Notification (`POST /notifications/`)
    - Fields: User (dropdown), Message (textarea), Date (picker)
    - Behavior: date defaults to today

## Implementation Details

### Blazor
- Use Radzen `DataGrid` for grid pages with `AllowPaging`, `AllowFiltering`, `AllowSorting`.
- Use Radzen `TemplateForm` for form pages; bind to model and call `HttpClient.PostAsync` on submit.
- Load dropdown data in `OnInitializedAsync()` via `HttpClient.GetFromJsonAsync<T>`.
- Style pages with Radzen CSS themes.

### Angular
- Use `MatTable` with `MatPaginator` and `MatSort` for grid pages.
- Use Reactive Forms (`FormGroup`, `FormControl`) with validators for form pages.
- Create services with `HttpClient` that use `environment.apiBaseUrl`.
- Use Angular Material components: `MatFormField`, `MatInput`, `MatSelect`, `MatDatepicker`, `MatSnackBar`.

*This detailed plan guides implementation of each page for realistic CRUD UI in both client frameworks.*
