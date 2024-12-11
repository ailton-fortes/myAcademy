import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../../../core/services/course.service';
import { Course } from '../../../../core/models/course.model';
import { 
  BookOpenIcon, 
  UsersIcon, 
  StarIcon, 
  TrendingUpIcon,
  PlusIcon
} from 'lucide-angular';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    BookOpenIcon,
    UsersIcon,
    StarIcon,
    TrendingUpIcon,
    PlusIcon
  ],
  template: `
    <div class="p-6">
      <div class="mb-8 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">My Courses</h1>
          <p class="mt-2 text-sm text-gray-600">
            Manage your courses and track their performance
          </p>
        </div>
        <a
          routerLink="/dashboard/courses/create"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <lucide-plus class="h-5 w-5 mr-2"></lucide-plus>
          Create New Course
        </a>
      </div>

      <!-- Course List -->
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" class="divide-y divide-gray-200">
          @for (course of courses; track course.id) {
            <li>
              <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <img
                      [src]="course.thumbnail"
                      [alt]="course.title"
                      class="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <p class="text-sm font-medium text-indigo-600 truncate">
                        {{ course.title }}
                      </p>
                      <div class="mt-2 flex items-center text-sm text-gray-500">
                        <lucide-book-open class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400">
                        </lucide-book-open>
                        <p>{{ course.lessons.length }} lessons</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-8">
                    <div class="flex flex-col items-end">
                      <div class="flex items-center">
                        <lucide-users class="h-5 w-5 text-gray-400 mr-1"></lucide-users>
                        <span class="text-sm text-gray-900">{{ course.enrolledCount }}</span>
                      </div>
                      <div class="flex items-center mt-1">
                        <lucide-star class="h-5 w-5 text-yellow-400 mr-1"></lucide-star>
                        <span class="text-sm text-gray-900">{{ course.rating }}</span>
                      </div>
                    </div>
                    <div class="flex flex-col items-end">
                      <span class="text-sm font-medium text-gray-900">${{ course.price }}</span>
                      <span class="text-sm text-gray-500">Per student</span>
                    </div>
                    <div class="flex space-x-2">
                      <button
                        class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                      >
                        Edit
                      </button>
                      <button
                        class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Course Stats -->
                <div class="mt-4 grid grid-cols-3 gap-4">
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <p class="text-sm text-gray-600">Revenue</p>
                    <p class="text-lg font-medium text-gray-900">
                      ${{ course.enrolledCount * course.price }}
                    </p>
                  </div>
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <p class="text-sm text-gray-600">Avg. Rating</p>
                    <p class="text-lg font-medium text-gray-900">{{ course.rating }}/5.0</p>
                  </div>
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <p class="text-sm text-gray-600">Completion Rate</p>
                    <p class="text-lg font-medium text-gray-900">82%</p>
                  </div>
                </div>
              </div>
            </li>
          }
        </ul>
      </div>

      @if (courses.length === 0) {
        <div class="text-center py-12">
          <lucide-book-open class="mx-auto h-12 w-12 text-gray-400"></lucide-book-open>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No courses yet</h3>
          <p class="mt-1 text-sm text-gray-500">
            Get started by creating your first course
          </p>
          <div class="mt-6">
            <a
              routerLink="/dashboard/courses/create"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <lucide-plus class="h-5 w-5 mr-2"></lucide-plus>
              Create New Course
            </a>
          </div>
        </div>
      }
    </div>
  `
})
export class MyCoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(
      courses => this.courses = courses
    );
  }
}