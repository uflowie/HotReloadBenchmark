import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgIf, NgFor } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { MatCardModule } from '@angular/material/card';
import type { Order } from '../models/order.model';

@Component({
  selector: 'app-add-invoice',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, NgIf, NgFor, SideNavComponent, MatCardModule],
  template: `
    <app-side-nav>
      <mat-card style="margin: 24px auto; max-width: 600px;">
        <h2>Add Invoice</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill" style="width: 100%; max-width: 400px;">
        <mat-label>Order</mat-label>
        <mat-select formControlName="orderId" required>
          <mat-option *ngFor="let order of orders" [value]="order.id">Order #{{order.id}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('orderId')?.hasError('required')">Order is required</mat-error>
      </mat-form-field>
      <mat-form-field appearance="fill" style="width: 100%; max-width: 400px;">
        <mat-label>Amount</mat-label>
        <input matInput type="number" formControlName="amount" required>
        <mat-error *ngIf="form.get('amount')?.hasError('required')">Amount is required</mat-error>
        <mat-error *ngIf="form.get('amount')?.hasError('min')">Must be positive</mat-error>
      </mat-form-field>
      <mat-form-field appearance="fill" style="width: 100%; max-width: 400px;">
        <mat-label>Date</mat-label>
        <input matInput [matDatepicker]="picker" formControlName="date" required>
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
        <mat-error *ngIf="form.get('date')?.hasError('required')">Date is required</mat-error>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || loading">Submit</button>
    </form>
    <div *ngIf="loading">Submitting...</div>
  `
})
export class AddInvoiceComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private snackBar = inject(MatSnackBar);
  form: FormGroup = this.fb.group({
    orderId: ['', Validators.required],
    amount: [null, [Validators.required, Validators.min(0.01)]],
    date: ['', Validators.required]
  });
  orders: Order[] = [];
  loading = false;

  ngOnInit() {
    this.api.getOrders().subscribe(orders => this.orders = orders);
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.api.createInvoice({
      orderId: this.form.value.orderId,
      amount: this.form.value.amount,
      date: this.form.value.date
    }).subscribe({
      next: () => {
        this.snackBar.open('Invoice added successfully!', 'Close', { duration: 2000 });
        this.form.reset();
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Failed to add invoice', 'Close', { duration: 2000 });
        this.loading = false;
      }
    });
  }
}
