import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../core/services/course.service';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { Course } from '../../core/models/course.model';
import { SearchIcon, FilterIcon } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CourseCardComponent, SearchIcon, FilterIcon, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 pt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Search and Filters -->
        <div class="mb-8">
          <div class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div class="flex-1 relative">
              <lucide-search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5">
              </lucide-search>
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (ngModelChange)="filterCourses()"
                placeholder="Search courses..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            
            <select
              [(ngModel)]="selectedCategory"
              (ngModelChange)="filterCourses()"
              class="block w-full md:w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">All Categories</option>
              @for (category of categories; track category) {
                <option [value]="category">{{ category }}</option>
              }
            </select>
          </div>
        </div>

        <!-- Course Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (course of filteredCourses; track course.id) {
            <app-course-card [course]="course"></app-course-card>
          }
        </div>

        @if (filteredCourses.length === 0) {
          <div class="text-center py-12">
            <h3 class="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
            <p class="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        }
      </div>
    </div>
  `
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchQuery = '';
  selectedCategory = '';
  categories = ['Web Development', 'Data Science', 'Mobile Development', 'Design'];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
      this.filteredCourses = courses;
    });
  }

  filterCourses(): void {
    this.filteredCourses = this.courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = !this.selectedCategory || course.category === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }
}