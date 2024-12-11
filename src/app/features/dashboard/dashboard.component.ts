import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DashboardLayoutComponent],
  template: `
    <app-dashboard-layout>
      <router-outlet></router-outlet>
    </app-dashboard-layout>
  `
})
export class DashboardComponent {}