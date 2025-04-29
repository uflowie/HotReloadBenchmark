import { Component } from '@angular/core';
import { SideNavComponent } from './side-nav.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SideNavComponent, MatCardModule],
  template: `
    <app-side-nav>
      <mat-card style="margin: 24px auto; max-width: 600px; text-align: center;">
        <h1>Hello World</h1>
        <p>Welcome to the HotReloadBenchmark Angular App!</p>
      </mat-card>
    </app-side-nav>
  `
})
export class HomeComponent {}
