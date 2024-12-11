import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ShoppingBagIcon } from 'lucide-angular';
import { async } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, ShoppingBagIcon],
  template: `
    <div class="min-h-screen bg-gray-50 pt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="bg-white shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-lg font-medium text-gray-900">Shopping Cart</h2>
            
            @if (cartItems$ | async; as items) {
              @if (items.length === 0) {
                <div class="flex flex-col items-center justify-center py-12">
                  <lucide-shopping-bag class="h-16 w-16 text-gray-400"></lucide-shopping-bag>
                  <h3 class="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
                  <p class="mt-1 text-sm text-gray-500">Start adding courses to your cart!</p>
                  <a
                    routerLink="/courses"
                    class="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Browse Courses
                  </a>
                </div>
              } @else {
                <div class="mt-6 space-y-4">
                  @for (item of items; track item.courseId) {
                    <div class="flex items-center py-6 border-b border-gray-200">
                      <img
                        [src]="item.course.thumbnail"
                        [alt]="item.course.title"
                        class="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                      />
                      <div class="ml-4 flex-1">
                        <h3 class="text-sm font-medium text-gray-900">{{ item.course.title }}</h3>
                        <p class="mt-1 text-sm text-gray-500">by {{ item.course.instructor.name }}</p>
                      </div>
                      <div class="ml-4">
                        <p class="text-sm font-medium text-gray-900">${{ item.course.price }}</p>
                      </div>
                      <button
                        (click)="removeItem(item.courseId)"
                        class="ml-4 text-gray-400 hover:text-red-500"
                      >
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  }
                </div>

                <div class="mt-8 border-t border-gray-200 pt-6">
                  <div class="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${{ total | async }}</p>
                  </div>
                  <p class="mt-0.5 text-sm text-gray-500">
                    Taxes calculated at checkout.
                  </p>
                  <div class="mt-6">
                    <a
                      routerLink="/checkout"
                      class="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Checkout
                    </a>
                  </div>
                  <div class="mt-6 flex justify-center text-sm text-gray-500">
                    <p>
                      or
                      <a routerLink="/courses" class="text-indigo-600 font-medium hover:text-indigo-500">
                        Continue Shopping<span aria-hidden="true"> →</span>
                      </a>
                    </p>
                  </div>
                </div>
              }
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class CartComponent {
  cartItems$ = this.cartService.cartItems$;
  total$ = this.cartService.getTotal();

  constructor(private cartService: CartService) {}

  removeItem(courseId: string): void {
    this.cartService.removeItem(courseId);
  }
}
