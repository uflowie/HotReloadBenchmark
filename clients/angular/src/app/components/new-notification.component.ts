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
import type { User } from '../models/user.model';

@Component({
  selector: 'app-new-notification',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, NgIf, NgFor, SideNavComponent, MatCardModule],
  template: `
    <app-side-nav>
      <mat-card style="margin: 24px auto; max-width: 600px;">
        <h2>New Notification</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill" style="width: 100%; max-width: 400px;">
        <mat-label>User</mat-label>
        <mat-select formControlName="userId" required>
          <mat-option *ngFor="let user of users" [value]="user.id">{{user.name}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('userId')?.hasError('required')">User is required</mat-error>
      </mat-form-field>
      <mat-form-field appearance="fill" style="width: 100%; max-width: 400px;">
        <mat-label>Message</mat-label>
        <textarea matInput formControlName="message" rows="3" required></textarea>
        <mat-error *ngIf="form.get('message')?.hasError('required')">Message is required</mat-error>
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
export class NewNotificationComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private snackBar = inject(MatSnackBar);
  form: FormGroup = this.fb.group({
    userId: ['', Validators.required],
    message: ['', Validators.required],
    date: [new Date(), Validators.required]
  });
  users: User[] = [];
  loading = false;

  ngOnInit() {
    this.api.getUsers().subscribe(users => this.users = users);
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.api.createNotification({
      userId: this.form.value.userId,
      message: this.form.value.message,
      date: this.form.value.date
    }).subscribe({
      next: () => {
        this.snackBar.open('Notification created!', 'Close', { duration: 2000 });
        this.form.reset({ date: new Date() });
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Failed to create notification', 'Close', { duration: 2000 });
        this.loading = false;
      }
    });
  }
}
