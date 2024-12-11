import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { 
  HomeIcon, 
  BookOpenIcon, 
  UsersIcon, 
  MessageSquareIcon, 
  SettingsIcon,
  LogOutIcon
} from 'lucide-angular';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    RouterLinkActive,
    HomeIcon,
    BookOpenIcon,
    UsersIcon,
    MessageSquareIcon,
    SettingsIcon,
    LogOutIcon
  ],
  template: `
    <div class="min-h-screen bg-gray-50 flex">
      <!-- Sidebar -->
      <aside class="hidden md:flex md:flex-col md:w-64 bg-white border-r border-gray-100">
        <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div class="flex items-center flex-shrink-0 px-4">
            <span class="text-2xl font-bold text-indigo-600">EduPro</span>
          </div>
          <nav class="mt-8 flex-1 px-2 space-y-1">
            <a
              routerLink="/dashboard"
              routerLinkActive="bg-indigo-50 text-indigo-600"
              [routerLinkActiveOptions]="{ exact: true }"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <lucide-home class="mr-3 h-6 w-6"></lucide-home>
              Overview
            </a>
            <a
              routerLink="/dashboard/courses"
              routerLinkActive="bg-indigo-50 text-indigo-600"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50"
            >
              <lucide-book-open class="mr-3 h-6 w-6"></lucide-book-open>
              My Courses
            </a>
            <a
              routerLink="/dashboard/community"
              routerLinkActive="bg-indigo-50 text-indigo-600"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50"
            >
              <lucide-users class="mr-3 h-6 w-6"></lucide-users>
              Community
            </a>
            <a
              routerLink="/dashboard/messages"
              routerLinkActive="bg-indigo-50 text-indigo-600"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50"
            >
              <lucide-message-square class="mr-3 h-6 w-6"></lucide-message-square>
              Messages
            </a>
            <a
              routerLink="/dashboard/settings"
              routerLinkActive="bg-indigo-50 text-indigo-600"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50"
            >
              <lucide-settings class="mr-3 h-6 w-6"></lucide-settings>
              Settings
            </a>
          </nav>
        </div>
        <div class="flex-shrink-0 flex border-t border-gray-100 p-4">
          <button
            (click)="logout()"
            class="flex-shrink-0 w-full group block text-left"
          >
            <div class="flex items-center">
              <div>
                <img
                  class="inline-block h-9 w-9 rounded-full"
                  [src]="user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'"
                  [alt]="user?.name"
                />
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {{ user?.name }}
                </p>
                <p class="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  {{ user?.role }}
                </p>
              </div>
              <lucide-log-out class="ml-auto h-5 w-5 text-gray-400 group-hover:text-gray-500">
              </lucide-log-out>
            </div>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto">
        <ng-content></ng-content>
      </main>
    </div>
  `
})
export class DashboardLayoutComponent {
  user$ = this.authService.currentUser$;

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}