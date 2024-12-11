import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { CourseService } from '../../../../core/services/course.service';
import { Course } from '../../../../core/models/course.model';
import { 
  UsersIcon, 
  BookOpenIcon, 
  ClockIcon, 
  TrendingUpIcon 
} from 'lucide-angular';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, UsersIcon, BookOpenIcon, ClockIcon, TrendingUpIcon],
  template: `
    <div class="p-6">
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Enrolled Courses</p>
              <p class="text-2xl font-bold text-gray-900">{{ enrolledCourses.length }}</p>
            </div>
            <lucide-book-open class="w-8 h-8 text-indigo-600"></lucide-book-open>
          </div>
          <div class="mt-2">
            <span class="text-sm text-green-600">+15% from last month</span>
          </div>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Hours Learned</p>
              <p class="text-2xl font-bold text-gray-900">48</p>
            </div>
            <lucide-clock class="w-8 h-8 text-indigo-600"></lucide-clock>
          </div>
          <div class="mt-2">
            <span class="text-sm text-green-600">+8% from last month</span>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Certificates</p>
              <p class="text-2xl font-bold text-gray-900">3</p>
            </div>
            <lucide-trending-up class="w-8 h-8 text-indigo-600"></lucide-trending-up>
          </div>
          <div class="mt-2">
            <span class="text-sm text-gray-600">Completed courses</span>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Active Students</p>
              <p class="text-2xl font-bold text-gray-900">824</p>
            </div>
            <lucide-users class="w-8 h-8 text-indigo-600"></lucide-users>
          </div>
          <div class="mt-2">
            <span class="text-sm text-green-600">Currently online</span>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-100">
        <div class="p-6 border-b border-gray-100">
          <h2 class="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div class="divide-y divide-gray-100">
          @for (course of enrolledCourses; track course.id) {
            <div class="p-6 flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <img
                  [src]="course.thumbnail"
                  [alt]="course.title"
                  class="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 class="text-sm font-medium text-gray-900">{{ course.title }}</h3>
                  <p class="text-sm text-gray-500">{{ course.instructor.name }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="w-48 bg-gray-100 rounded-full h-2">
                  <div
                    class="bg-indigo-600 h-2 rounded-full"
                    style="width: 75%"
                  ></div>
                </div>
                <span class="text-sm font-medium text-gray-900">75%</span>
                <a
                  [routerLink]="['/courses', course.id]"
                  class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Continue
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class OverviewComponent implements OnInit {
  enrolledCourses: Course[] = [];

  constructor(
    private authService: AuthService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(
      courses => this.enrolledCourses = courses
    );
  }
}