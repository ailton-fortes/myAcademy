import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course } from '../../../../core/models/course.model';
import { StarIcon, ClockIcon, UsersIcon } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, RouterLink, StarIcon, ClockIcon, UsersIcon],
  template: `
    <a [routerLink]="['/courses', course.id]" 
       class="block bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        [src]="course.thumbnail"
        [alt]="course.title"
        class="w-full h-48 object-cover"
      />
      <div class="p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-gray-500">{{ course.category }}</span>
          <div class="flex items-center">
            <lucide-star class="w-4 h-4 text-yellow-400"></lucide-star>
            <span class="ml-1 text-sm text-gray-600">{{ course.rating }}</span>
          </div>
        </div>
        <h3 class="text-lg font-semibold mb-2">{{ course.title }}</h3>
        <p class="text-gray-600 text-sm mb-4 line-clamp-2">
          {{ course.description }}
        </p>
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center text-sm text-gray-500">
            <lucide-clock class="w-4 h-4 mr-1"></lucide-clock>
            <span>{{ course.duration }} hrs</span>
          </div>
          <div class="flex items-center text-sm text-gray-500">
            <lucide-users class="w-4 h-4 mr-1"></lucide-users>
            <span>{{ course.enrolledCount }} students</span>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <img
              [src]="course.instructor.avatar"
              [alt]="course.instructor.name"
              class="w-8 h-8 rounded-full mr-2"
            />
            <span class="text-sm text-gray-700">
              {{ course.instructor.name }}
            </span>
          </div>
          <span class="text-lg font-bold text-indigo-600">
            ${{ course.price }}
          </span>
        </div>
      </div>
    </a>
  `
})
export class CourseCardComponent {
  @Input({ required: true }) course!: Course;
}