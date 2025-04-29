import { Component, ViewChild, inject } from '@angular/core';
import { FilterTableDataSource } from './filter-table-data-source';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../services/api.service';
import type { Order } from '../models/order.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgIf, CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, NgIf, SideNavComponent, MatCardModule],
  template: `
    <app-side-nav>
      <mat-card style="margin: 24px auto; max-width: 900px;">
        <h2>Orders List</h2>

    <div *ngIf="dataSource">
      <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">
        <!-- ID Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            ID
            <mat-form-field style="width: 100px; margin-bottom: 0;">
              <input matInput placeholder="Filter" (keyup)="dataSource.setFilterValue('id', $any($event.target).value)">
            </mat-form-field>
          </th>
          <td mat-cell *matCellDef="let order">{{order.id}}</td>
        </ng-container>
        <!-- Product ID Column -->
        <ng-container matColumnDef="productId">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            Product ID
            <mat-form-field style="width: 100px; margin-bottom: 0;">
              <input matInput placeholder="Filter" (keyup)="dataSource.setFilterValue('productId', $any($event.target).value)">
            </mat-form-field>
          </th>
          <td mat-cell *matCellDef="let order">{{order.productId}}</td>
        </ng-container>
        <!-- Quantity Column -->
        <ng-container matColumnDef="quantity">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            Quantity
            <mat-form-field style="width: 100px; margin-bottom: 0;">
              <input matInput placeholder="Filter" (keyup)="dataSource.setFilterValue('quantity', $any($event.target).value)">
            </mat-form-field>
          </th>
          <td mat-cell *matCellDef="let order">{{order.quantity}}</td>
        </ng-container>
        <!-- Total Column -->
        <ng-container matColumnDef="total">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            Total
            <mat-form-field style="width: 100px; margin-bottom: 0;">
              <input matInput placeholder="Filter" (keyup)="dataSource.setFilterValue('total', $any($event.target).value)">
            </mat-form-field>
          </th>
          <td mat-cell *matCellDef="let order">{{order.total | currency}}</td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
      <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
    </div>
    <div *ngIf="!dataSource">
      Loading orders...
    </div>
  `
})
export class OrdersListComponent {
  apiService = inject(ApiService);
  displayedColumns: string[] = ['id', 'productId', 'quantity', 'total'];
  dataSource = new FilterTableDataSource<Order>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.apiService.getOrders().subscribe(orders => {
      this.dataSource.data = orders;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }
}
