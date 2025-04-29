import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgIf, NgFor } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { MatCardModule } from '@angular/material/card';
import type { Invoice } from '../models/invoice.model';

@Component({
  selector: 'app-add-payment',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatSnackBarModule, NgIf, NgFor, SideNavComponent, MatCardModule],
  template: `
    <app-side-nav>
      <mat-card style="margin: 24px auto; max-width: 600px;">
        <h2>Add Payment</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill" style="width: 100%; max-width: 400px;">
        <mat-label>Invoice</mat-label>
        <mat-select formControlName="invoiceId" required>
          <mat-option *ngFor="let invoice of invoices" [value]="invoice.id">Invoice #{{invoice.id}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('invoiceId')?.hasError('required')">Invoice is required</mat-error>
      </mat-form-field>
      <mat-form-field appearance="fill" style="width: 100%; max-width: 400px;">
        <mat-label>Amount</mat-label>
        <input matInput type="number" formControlName="amount" required>
        <mat-error *ngIf="form.get('amount')?.hasError('required')">Amount is required</mat-error>
        <mat-error *ngIf="form.get('amount')?.hasError('min')">Must be positive</mat-error>
      </mat-form-field>
      <mat-form-field appearance="fill" style="width: 100%; max-width: 400px;">
        <mat-label>Method</mat-label>
        <mat-select formControlName="method" required>
          <mat-option value="credit_card">Credit Card</mat-option>
          <mat-option value="bank_transfer">Bank Transfer</mat-option>
          <mat-option value="cash">Cash</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('method')?.hasError('required')">Method is required</mat-error>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || loading">Submit</button>
    </form>
    <div *ngIf="loading">Submitting...</div>
  `
})
export class AddPaymentComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private snackBar = inject(MatSnackBar);
  form: FormGroup = this.fb.group({
    invoiceId: ['', Validators.required],
    amount: [null, [Validators.required, Validators.min(0.01)]],
    method: ['', Validators.required]
  });
  invoices: Invoice[] = [];
  loading = false;

  ngOnInit() {
    this.api.getInvoices().subscribe(invoices => this.invoices = invoices);
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.api.createPayment({
      invoiceId: this.form.value.invoiceId,
      amount: this.form.value.amount,
      method: this.form.value.method
    }).subscribe({
      next: () => {
        this.snackBar.open('Payment added successfully!', 'Close', { duration: 2000 });
        this.form.reset();
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Failed to add payment', 'Close', { duration: 2000 });
        this.loading = false;
      }
    });
  }
}
