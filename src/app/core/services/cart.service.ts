import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../models/cart.model';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  addItem(course: Course): void {
    const currentItems = this.cartItems.value;
    if (!currentItems.some(item => item.courseId === course.id)) {
      const newItems = [...currentItems, { courseId: course.id, course, quantity: 1 }];
      this.cartItems.next(newItems);
      this.saveCart(newItems);
    }
  }

  removeItem(courseId: string): void {
    const newItems = this.cartItems.value.filter(item => item.courseId !== courseId);
    this.cartItems.next(newItems);
    this.saveCart(newItems);
  }

  clearCart(): void {
    this.cartItems.next([]);
    localStorage.removeItem('cart');
  }

  getTotal(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((sum, item) => sum + item.course.price, 0))
    );
  }

  getItemCount(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.length)
    );
  }

  private saveCart(items: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(items));
  }
}
