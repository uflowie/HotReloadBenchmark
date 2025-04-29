import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary" style="margin-bottom: 16px;">
      <button mat-button routerLink="/" routerLinkActive="active">Home</button>
      <span style="flex: 1 1 auto;"></span>
      <button mat-button routerLink="/users" routerLinkActive="active">Users</button>
      <button mat-button routerLink="/products" routerLinkActive="active">Products</button>
      <button mat-button routerLink="/orders" routerLinkActive="active">Orders</button>
      <button mat-button routerLink="/inventory" routerLinkActive="active">Inventory</button>
      <button mat-button routerLink="/customers" routerLinkActive="active">Customers</button>
      <button mat-button routerLink="/add-supplier" routerLinkActive="active">Add Supplier</button>
      <button mat-button routerLink="/add-invoice" routerLinkActive="active">Add Invoice</button>
      <button mat-button routerLink="/add-payment" routerLinkActive="active">Add Payment</button>
      <button mat-button routerLink="/create-ticket" routerLinkActive="active">Create Ticket</button>
      <button mat-button routerLink="/new-notification" routerLinkActive="active">New Notification</button>
    </mat-toolbar>
  `
})
export class NavMenuComponent {}
