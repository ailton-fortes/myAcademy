import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./components/overview/overview.component').then(m => m.OverviewComponent)
      },
      {
        path: 'courses',
        loadComponent: () => import('./components/my-courses/my-courses.component').then(m => m.MyCoursesComponent)
      },
      {
        path: 'courses/create',
        loadComponent: () => import('./components/course-create/course-create.component').then(m => m.CourseCreateComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./components/settings/settings.component').then(m => m.SettingsComponent)
      }
    ]
  }
];