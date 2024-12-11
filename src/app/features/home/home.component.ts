import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../core/services/course.service';
import { CourseCardComponent } from '../courses/components/course-card/course-card.component';
import { Course } from '../../core/models/course.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, CourseCardComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Hero Section -->
      <section class="pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div class="max-w-7xl mx-auto pt-16 pb-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-6">
              Transform Your Future with Online Learning
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-indigo-100">
              Access world-class courses from expert instructors
            </p>
            <div class="flex justify-center space-x-4">
              <a
                routerLink="/courses"
                class="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
              >
                Browse Courses
              </a>
              <a
                routerLink="/teach"
                class="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Become an Instructor
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Courses -->
      <section class="py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p class="text-lg text-gray-600">
              Start your learning journey with our most popular courses
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (course of featuredCourses; track course.id) {
              <app-course-card [course]="course"></app-course-card>
            }
          </div>
          @if (featuredCourses.length > 3) {
            <div class="text-center mt-12">
              <a
                routerLink="/courses"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                View All Courses
              </a>
            </div>
          }
        </div>
      </section>

      <!-- Categories Section -->
      <section class="py-16 bg-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <p class="text-lg text-gray-600">
              Explore our wide range of course categories
            </p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (category of categories; track category.name) {
              <a
                [routerLink]="['/courses']"
                [queryParams]="{ category: category.name }"
                class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div class="text-center">
                  <div class="w-12 h-12 mx-auto mb-4 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <img [src]="category.icon" [alt]="category.name" class="w-6 h-6" />
                  </div>
                  <h3 class="text-lg font-medium text-gray-900 mb-2">
                    {{ category.name }}
                  </h3>
                  <p class="text-sm text-gray-500">{{ category.courseCount }} courses</p>
                </div>
              </a>
            }
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              Why Choose EduPro?
            </h2>
            <p class="text-lg text-gray-600">
              Experience the benefits of our platform
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <h3 class="text-xl font-medium text-gray-900 mb-2">
                Learn at Your Own Pace
              </h3>
              <p class="text-gray-600">
                Access course content anytime, anywhere, and learn at your own speed
              </p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-medium text-gray-900 mb-2">
                Expert Instructors
              </h3>
              <p class="text-gray-600">
                Learn from industry experts with real-world experience
              </p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-medium text-gray-900 mb-2">
                Certificate of Completion
              </h3>
              <p class="text-gray-600">
                Earn certificates to showcase your achievements
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="bg-indigo-700 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-bold text-white mb-4">
              Ready to Start Learning?
            </h2>
            <p class="text-xl text-indigo-100 mb-8">
              Join thousands of students already learning on our platform
            </p>
            <a
              routerLink="/auth/register"
              class="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>
    </div>
  `
})
export class HomeComponent implements OnInit {
  featuredCourses: Course[] = [];
  categories = [
    {
      name: 'Web Development',
      icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/html5.svg',
      courseCount: 120
    },
    {
      name: 'Data Science',
      icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/python.svg',
      courseCount: 85
    },
    {
      name: 'Mobile Development',
      icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/android.svg',
      courseCount: 65
    },
    {
      name: 'Design',
      icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/adobexd.svg',
      courseCount: 45
    }
  ];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(
      courses => this.featuredCourses = courses.slice(0, 3)
    );
  }
}