import { Component, ViewChild, inject } from '@angular/core';
import { FilterTableDataSource } from './filter-table-data-source';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../services/api.service';
import type { Product } from '../models/product.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgIf, CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, NgIf, SideNavComponent, MatCardModule],
  template: `
    <app-side-nav>
      <mat-card style="margin: 24px auto; max-width: 900px;">
        <h2>Products List</h2>

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
          <td mat-cell *matCellDef="let product">{{product.id}}</td>
        </ng-container>
        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            Name
            <mat-form-field style="width: 100px; margin-bottom: 0;">
              <input matInput placeholder="Filter" (keyup)="dataSource.setFilterValue('name', $any($event.target).value)">
            </mat-form-field>
          </th>
          <td mat-cell *matCellDef="let product">{{product.name}}</td>
        </ng-container>
        <!-- Description Column -->
        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            Description
            <mat-form-field style="width: 100px; margin-bottom: 0;">
              <input matInput placeholder="Filter" (keyup)="dataSource.setFilterValue('description', $any($event.target).value)">
            </mat-form-field>
          </th>
          <td mat-cell *matCellDef="let product">{{product.description}}</td>
        </ng-container>
        <!-- Price Column -->
        <ng-container matColumnDef="price">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            Price
            <mat-form-field style="width: 100px; margin-bottom: 0;">
              <input matInput placeholder="Filter" (keyup)="dataSource.setFilterValue('price', $any($event.target).value)">
            </mat-form-field>
          </th>
          <td mat-cell *matCellDef="let product">{{product.price | currency}}</td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
      <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
    </div>
    <div *ngIf="!dataSource">
      Loading products...
    </div>
  `
})
export class ProductsListComponent {
  apiService = inject(ApiService);
  displayedColumns: string[] = ['id', 'name', 'description', 'price'];
  dataSource = new FilterTableDataSource<Product>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.apiService.getProducts().subscribe(products => {
      this.dataSource.data = products;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }
}
