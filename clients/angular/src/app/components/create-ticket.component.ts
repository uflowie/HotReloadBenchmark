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
import type { Customer } from '../models/customer.model';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatSnackBarModule, NgIf, NgFor, SideNavComponent, MatCardModule],
  template: `
    <app-side-nav>
      <mat-card style="margin: 24px auto; max-width: 600px;">
        <h2>Create Ticket</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill" style="width: 100%; max-width: 400px;">
        <mat-label>Customer</mat-label>
        <mat-select formControlName="customerId" required>
          <mat-option *ngFor="let customer of customers" [value]="customer.id">{{customer.name}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('customerId')?.hasError('required')">Customer is required</mat-error>
      </mat-form-field>
      <mat-form-field appearance="fill" style="width: 100%; max-width: 400px;">
        <mat-label>Issue</mat-label>
        <textarea matInput formControlName="issue" rows="4" required></textarea>
        <mat-error *ngIf="form.get('issue')?.hasError('required')">Issue is required</mat-error>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || loading">Submit</button>
    </form>
    <div *ngIf="loading">Submitting...</div>
  `
})
export class CreateTicketComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private snackBar = inject(MatSnackBar);
  form: FormGroup = this.fb.group({
    customerId: ['', Validators.required],
    issue: ['', Validators.required]
  });
  customers: Customer[] = [];
  loading = false;

  ngOnInit() {
    this.api.getCustomers().subscribe(customers => this.customers = customers);
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.api.createTicket({
      customerId: this.form.value.customerId,
      issue: this.form.value.issue
    }).subscribe({
      next: () => {
        this.snackBar.open('Ticket created successfully!', 'Close', { duration: 2000 });
        this.form.reset();
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Failed to create ticket', 'Close', { duration: 2000 });
        this.loading = false;
      }
    });
  }
}
