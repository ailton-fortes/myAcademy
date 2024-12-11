import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseEditorComponent } from '../course-editor/course-editor.component';

@Component({
  selector: 'app-course-create',
  standalone: true,
  imports: [CommonModule, CourseEditorComponent],
  template: `
    <div class="p-6">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Create New Course</h1>
        <p class="mt-2 text-sm text-gray-600">
          Fill in the details below to create your new course
        </p>
      </div>
      <app-course-editor></app-course-editor>
    </div>
  `
})
export class CourseCreateComponent {}