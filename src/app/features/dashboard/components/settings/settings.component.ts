import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="p-6">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p class="mt-2 text-sm text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div class="bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <form [formGroup]="settingsForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Profile Section -->
            <div>
              <h3 class="text-lg font-medium leading-6 text-gray-900">Profile</h3>
              <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-3">
                  <label for="name" class="block text-sm font-medium text-gray-700">
                    Full name
                  </label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="name"
                      formControlName="name"
                      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div class="sm:col-span-4">
                  <label for="email" class="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div class="mt-1">
                    <input
                      type="email"
                      id="email"
                      formControlName="email"
                      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div class="sm:col-span-6">
                  <label for="bio" class="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <div class="mt-1">
                    <textarea
                      id="bio"
                      formControlName="bio"
                      rows="3"
                      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <p class="mt-2 text-sm text-gray-500">
                    Write a few sentences about yourself.
                  </p>
                </div>
              </div>
            </div>

            <!-- Notification Settings -->
            <div class="pt-6">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
              <div class="mt-6">
                <div class="space-y-4">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="emailNotifications"
                        type="checkbox"
                        formControlName="emailNotifications"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div class="ml-3">
                      <label for="emailNotifications" class="font-medium text-gray-700">
                        Email notifications
                      </label>
                      <p class="text-gray-500">Receive email notifications about course updates.</p>
                    </div>
                  </div>

                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="marketingEmails"
                        type="checkbox"
                        formControlName="marketingEmails"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div class="ml-3">
                      <label for="marketingEmails" class="font-medium text-gray-700">
                        Marketing emails
                      </label>
                      <p class="text-gray-500">Receive emails about new courses and features.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="pt-6 flex justify-end space-x-3">
              <button
                type="button"
                class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                [disabled]="!settingsForm.valid || isLoading"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class SettingsComponent {
  settingsForm: FormGroup;
  isLoading = false;
  user$ = this.authService.currentUser$;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.settingsForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bio: [''],
      emailNotifications: [true],
      marketingEmails: [false]
    });

    // Load user data into form
    this.user$.subscribe(user => {
      if (user) {
        this.settingsForm.patchValue({
          name: user.name,
          email: user.email
        });
      }
    });
  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      this.isLoading = true;
      // TODO: Implement settings update
      console.log('Settings form submitted:', this.settingsForm.value);
      this.isLoading = false;
    }
  }
}