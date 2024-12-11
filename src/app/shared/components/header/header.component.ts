import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShoppingCartIcon, MenuIcon, XIcon, UserIcon } from 'lucide-angular';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ShoppingCartIcon, MenuIcon, XIcon, UserIcon],
  template: `
    <header class="bg-white shadow-sm fixed w-full top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <a routerLink="/" class="text-2xl font-bold text-indigo-600">
              EduPro
            </a>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center space-x-8">
            <a routerLink="/courses" class="text-gray-700 hover:text-indigo-600">
              Courses
            </a>
            <a routerLink="/instructors" class="text-gray-700 hover:text-indigo-600">
              Instructors
            </a>
            <a routerLink="/community" class="text-gray-700 hover:text-indigo-600">
              Community
            </a>
            <div class="flex items-center space-x-4">
              <a routerLink="/cart" class="text-gray-700 hover:text-indigo-600">
                <lucide-shopping-cart class="w-6 h-6"></lucide-shopping-cart>
              </a>
              @if (!authService.isAuthenticated()) {
                <a
                  routerLink="/auth/login"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <lucide-user class="w-4 h-4 mr-2"></lucide-user>
                  Sign In
                </a>
              } @else {
                <a
                  routerLink="/dashboard"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Dashboard
                </a>
              }
            </div>
          </nav>

          <!-- Mobile menu button -->
          <div class="flex items-center md:hidden">
            <button
              (click)="isMenuOpen = !isMenuOpen"
              class="text-gray-700 hover:text-indigo-600"
            >
              @if (isMenuOpen) {
                <lucide-x class="w-6 h-6"></lucide-x>
              } @else {
                <lucide-menu class="w-6 h-6"></lucide-menu>
              }
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      @if (isMenuOpen) {
        <div class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              routerLink="/courses"
              class="block px-3 py-2 text-gray-700 hover:text-indigo-600"
            >
              Courses
            </a>
            <a
              routerLink="/instructors"
              class="block px-3 py-2 text-gray-700 hover:text-indigo-600"
            >
              Instructors
            </a>
            <a
              routerLink="/community"
              class="block px-3 py-2 text-gray-700 hover:text-indigo-600"
            >
              Community
            </a>
            <a
              routerLink="/cart"
              class="block px-3 py-2 text-gray-700 hover:text-indigo-600"
            >
              Cart
            </a>
            @if (!authService.isAuthenticated()) {
              <a
                routerLink="/auth/login"
                class="block px-3 py-2 text-indigo-600 font-medium"
              >
                Sign In
              </a>
            } @else {
              <a
                routerLink="/dashboard"
                class="block px-3 py-2 text-indigo-600 font-medium"
              >
                Dashboard
              </a>
            }
          </div>
        </div>
      }
    </header>
  `
})
export class HeaderComponent {
  isMenuOpen = false;

  constructor(public authService: AuthService) {}
}