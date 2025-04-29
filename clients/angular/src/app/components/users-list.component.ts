import { Component, ViewChild, inject } from '@angular/core';
import { FilterTableDataSource } from './filter-table-data-source';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../services/api.service';
import type { User } from '../models/user.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgIf, CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, NgIf, SideNavComponent, MatCardModule],
  template: `
    <app-side-nav>
      <mat-card style="margin: 24px auto; max-width: 900px;">
        <h2>Users List</h2>

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
            <td mat-cell *matCellDef="let user">{{user.id}}</td>
          </ng-container>
          <!-- Name Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Name
              <mat-form-field style="width: 100px; margin-bottom: 0;">
                <input matInput placeholder="Filter" (keyup)="dataSource.setFilterValue('name', $any($event.target).value)">
              </mat-form-field>
            </th>
            <td mat-cell *matCellDef="let user">{{user.name}}</td>
          </ng-container>
          <!-- Email Column -->
          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Email
              <mat-form-field style="width: 100px; margin-bottom: 0;">
                <input matInput placeholder="Filter" (keyup)="dataSource.setFilterValue('email', $any($event.target).value)">
              </mat-form-field>
            </th>
            <td mat-cell *matCellDef="let user">{{user.email}}</td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
        <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
      </div>
      <div *ngIf="!dataSource">
        Loading users...
      </div>
    </mat-card>
  `
})
export class UsersListComponent {
  apiService = inject(ApiService);
  displayedColumns: string[] = ['id', 'name', 'email'];
  dataSource = new FilterTableDataSource<User>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.apiService.getUsers().subscribe(users => {
      this.dataSource.data = users;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }
}
