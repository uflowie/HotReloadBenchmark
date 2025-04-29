import { Component, ViewChild, inject } from '@angular/core';
import { FilterTableDataSource } from './filter-table-data-source';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../services/api.service';
import type { InventoryItem } from '../models/inventory-item.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgIf, CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, NgIf, SideNavComponent, MatCardModule],
  template: `
    <app-side-nav>
      <mat-card style="margin: 24px auto; max-width: 900px;">
        <h2>Inventory List</h2>

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
          <td mat-cell *matCellDef="let item">{{item.id}}</td>
        </ng-container>
        <!-- Product ID Column -->
        <ng-container matColumnDef="productId">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            Product ID
            <mat-form-field style="width: 100px; margin-bottom: 0;">
              <input matInput placeholder="Filter" (keyup)="dataSource.setFilterValue('productId', $any($event.target).value)">
            </mat-form-field>
          </th>
          <td mat-cell *matCellDef="let item">{{item.productId}}</td>
        </ng-container>
        <!-- Stock Column -->
        <ng-container matColumnDef="stock">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            Stock
            <mat-form-field style="width: 100px; margin-bottom: 0;">
              <input matInput placeholder="Filter" (keyup)="dataSource.setFilterValue('stock', $any($event.target).value)">
            </mat-form-field>
          </th>
          <td mat-cell *matCellDef="let item">{{item.stock}}</td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
      <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
    </div>
    <div *ngIf="!dataSource">
      Loading inventory...
    </div>
  `
})
export class InventoryListComponent {
  apiService = inject(ApiService);
  displayedColumns: string[] = ['id', 'productId', 'stock'];
  dataSource = new FilterTableDataSource<InventoryItem>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.apiService.getInventoryItems().subscribe(items => {
      this.dataSource.data = items;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }
}
