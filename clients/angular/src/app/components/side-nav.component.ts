import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterModule, MatSidenavModule, MatListModule, MatIconModule, MatToolbarModule],
  template: `
    <mat-sidenav-container style="height: 100vh;">
      <mat-sidenav mode="side" opened style="width: 220px;">
        <mat-toolbar color="primary">Navigation</mat-toolbar>
        <mat-nav-list>
          <a mat-list-item routerLink="/" routerLinkActive="active"><mat-icon>home</mat-icon> Home</a>
          <a mat-list-item routerLink="/users" routerLinkActive="active"><mat-icon>person</mat-icon> Users</a>
          <a mat-list-item routerLink="/products" routerLinkActive="active"><mat-icon>inventory_2</mat-icon> Products</a>
          <a mat-list-item routerLink="/orders" routerLinkActive="active"><mat-icon>shopping_cart</mat-icon> Orders</a>
          <a mat-list-item routerLink="/inventory" routerLinkActive="active"><mat-icon>store</mat-icon> Inventory</a>
          <a mat-list-item routerLink="/customers" routerLinkActive="active"><mat-icon>group</mat-icon> Customers</a>
          <a mat-list-item routerLink="/add-supplier" routerLinkActive="active"><mat-icon>add_business</mat-icon> Add Supplier</a>
          <a mat-list-item routerLink="/add-invoice" routerLinkActive="active"><mat-icon>receipt</mat-icon> Add Invoice</a>
          <a mat-list-item routerLink="/add-payment" routerLinkActive="active"><mat-icon>payments</mat-icon> Add Payment</a>
          <a mat-list-item routerLink="/create-ticket" routerLinkActive="active"><mat-icon>confirmation_number</mat-icon> Create Ticket</a>
          <a mat-list-item routerLink="/new-notification" routerLinkActive="active"><mat-icon>notifications</mat-icon> New Notification</a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content style="padding: 24px;">
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `
})
export class SideNavComponent {}
