import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';
import { CreditCardIcon, MailIcon, UserIcon } from 'lucide-angular';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CreditCardIcon, MailIcon, UserIcon],
  template: `
    <div class="min-h-screen bg-gray-50 pt-16">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="bg-white shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Checkout</h3>
            
            <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()" class="mt-5 space-y-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="firstName" class="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <lucide-user class="h-5 w-5 text-gray-400"></lucide-user>
                    </div>
                    <input
                      type="text"
                      id="firstName"
                      formControlName="firstName"
                      class="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="lastName" class="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <lucide-user class="h-5 w-5 text-gray-400"></lucide-user>
                    </div>
                    <input
                      type="text"
                      id="lastName"
                      formControlName="lastName"
                      class="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div class="col-span-6">
                  <label for="email" class="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <lucide-mail class="h-5 w-5 text-gray-400"></lucide-mail>
                    </div>
                    <input
                      type="email"
                      id="email"
                      formControlName="email"
                      class="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div class="col-span-6">
                  <label for="card" class="block text-sm font-medium text-gray-700">
                    Card details
                  </label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <lucide-credit-card class="h-5 w-5 text-gray-400"></lucide-credit-card>
                    </div>
                    <input
                      type="text"
                      id="card"
                      formControlName="card"
                      placeholder="Card number"
                      class="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div class="mt-4 grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      formControlName="expiry"
                      placeholder="MM/YY"
                      class="col-span-1 block w-full sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      formControlName="cvc"
                      placeholder="CVC"
                      class="col-span-1 block w-full sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-200 pt-6">
                <div class="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>${{ total$ | async }}</p>
                </div>
                <p class="mt-0.5 text-sm text-gray-500">
                  By completing your purchase you agree to our Terms of Service.
                </p>
              </div>

              <div class="mt-6">
                <button
                  type="submit"
                  [disabled]="checkoutForm.invalid || isProcessing"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {{ isProcessing ? 'Processing...' : 'Complete Purchase' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  isProcessing = false;
  total$ = this.cartService.getTotal();

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      card: ['', Validators.required],
      expiry: ['', Validators.required],
      cvc: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      this.isProcessing = true;
      // Simulate payment processing
      setTimeout(() => {
        this.cartService.clearCart();
        this.router.navigate(['/dashboard']);
        this.isProcessing = false;
      }, 2000);
    }
  }
}
