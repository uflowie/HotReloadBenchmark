import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/home.component').then(m => m.HomeComponent) },
  { path: 'users', loadComponent: () => import('./components/users-list.component').then(m => m.UsersListComponent) },
  { path: 'products', loadComponent: () => import('./components/products-list.component').then(m => m.ProductsListComponent) },
  { path: 'orders', loadComponent: () => import('./components/orders-list.component').then(m => m.OrdersListComponent) },
  { path: 'inventory', loadComponent: () => import('./components/inventory-list.component').then(m => m.InventoryListComponent) },
  { path: 'customers', loadComponent: () => import('./components/customers-list.component').then(m => m.CustomersListComponent) },
  { path: 'add-supplier', loadComponent: () => import('./components/add-supplier.component').then(m => m.AddSupplierComponent) },
  { path: 'add-invoice', loadComponent: () => import('./components/add-invoice.component').then(m => m.AddInvoiceComponent) },
  { path: 'add-payment', loadComponent: () => import('./components/add-payment.component').then(m => m.AddPaymentComponent) },
  { path: 'create-ticket', loadComponent: () => import('./components/create-ticket.component').then(m => m.CreateTicketComponent) },
  { path: 'new-notification', loadComponent: () => import('./components/new-notification.component').then(m => m.NewNotificationComponent) },
];
