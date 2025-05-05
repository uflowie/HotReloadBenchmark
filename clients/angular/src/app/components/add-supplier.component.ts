import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-supplier',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, NgIf, SideNavComponent, MatCardModule],
  template: `
    <app-side-nav>
      <mat-card style="margin: 24px auto; max-width: 600px;">
        <h2>Add Supplier</h2>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill" style="width: 100%; max-width: 400px;">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" required>
          <!-- <mat-hint>Enter supplier name</mat-hint> -->
          <mat-error *ngIf="form.get('name')?.hasError('required')">Name is required</mat-error>
        </mat-form-field>
        <mat-form-field appearance="fill" style="width: 100%; max-width: 400px;">
          <mat-label>Contact Email</mat-label>
          <input matInput formControlName="contact" required email>
          <mat-error *ngIf="form.get('contact')?.hasError('required')">Contact email is required</mat-error>
          <mat-error *ngIf="form.get('contact')?.hasError('email')">Invalid email</mat-error>
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || loading">Submit</button>
      </form>
      <div *ngIf="loading">Submitting...</div>
      </mat-card>
    </app-side-nav>
  `
})
export class AddSupplierComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private snackBar = inject(MatSnackBar);
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    contact: ['', [Validators.required, Validators.email]]
  });
  loading = false;

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.api.createSupplier({ name: this.form.value.name, contact: this.form.value.contact }).subscribe({
      next: () => {
        this.snackBar.open('Supplier added successfully!', 'Close', { duration: 2000 });
        this.form.reset();
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Failed to add supplier', 'Close', { duration: 2000 });
        this.loading = false;
      }
    });
  }
}
