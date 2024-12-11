import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private mockCourses: Course[] = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      description: 'Learn web development from scratch to advanced concepts.',
      price: 99.99,
      instructor: {
        id: 'inst1',
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
      },
      thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea',
      category: 'Web Development',
      rating: 4.8,
      enrolledCount: 1250,
      duration: 48,
      lessons: [
        {
          id: 'l1',
          title: 'Introduction to Web Development',
          description: 'Overview of web development basics',
          duration: 2,
          order: 1
        }
      ]
    }
  ];

  getCourses(): Observable<Course[]> {
    return of(this.mockCourses).pipe(delay(500));
  }

  getCourseById(id: string): Observable<Course | undefined> {
    return of(this.mockCourses.find(course => course.id === id)).pipe(delay(500));
  }
}