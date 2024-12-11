import { Course } from './course.model';

export interface CartItem {
  courseId: string;
  course: Course;
  quantity: number;
}

export interface CheckoutDetails {
  firstName: string;
  lastName: string;
  email: string;
  card: {
    number: string;
    expiry: string;
    cvc: string;
  };
}
