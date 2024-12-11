import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {UserIcon, MailIcon, LockIcon, LucideAngularModule} from 'lucide-angular';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, LucideAngularModule],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a routerLink="/auth/login" class="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </a>
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <lucide-icon [name]="UserIcon" class="h-5 w-5 text-gray-400"></lucide-icon>
                </div>
                <input
                  id="name"
                  type="text"
                  formControlName="name"
                  class="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  [class.border-red-500]="registerForm.get('name')?.invalid && registerForm.get('name')?.touched"
                />
              </div>
              @if (registerForm.get('name')?.invalid && registerForm.get('name')?.touched) {
                <p class="mt-2 text-sm text-red-600">Full name is required</p>
              }
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <lucide-icon [name]="MailIcon" class="h-5 w-5 text-gray-400"></lucide-icon>
                </div>
                <input
                  id="email"
                  type="email"
                  formControlName="email"
                  class="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  [class.border-red-500]="registerForm.get('email')?.invalid && registerForm.get('email')?.touched"
                />
              </div>
              @if (registerForm.get('email')?.invalid && registerForm.get('email')?.touched) {
                <p class="mt-2 text-sm text-red-600">Please enter a valid email address</p>
              }
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <lucide-icon [name]="LockIcon" class="h-5 w-5 text-gray-400"></lucide-icon>
                </div>
                <input
                  id="password"
                  type="password"
                  formControlName="password"
                  class="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  [class.border-red-500]="registerForm.get('password')?.invalid && registerForm.get('password')?.touched"
                />
              </div>
              @if (registerForm.get('password')?.invalid && registerForm.get('password')?.touched) {
                <p class="mt-2 text-sm text-red-600">
                  Password must be at least 8 characters long
                </p>
              }
            </div>

            <div>
              <button
                type="submit"
                [disabled]="registerForm.invalid || isLoading"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {{ isLoading ? 'Creating account...' : 'Create account' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  readonly MailIcon = MailIcon;
  readonly LockIcon = LockIcon;
  readonly UserIcon = UserIcon;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const { name, email, password } = this.registerForm.value;
      
      this.authService.register(name, email, password).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}