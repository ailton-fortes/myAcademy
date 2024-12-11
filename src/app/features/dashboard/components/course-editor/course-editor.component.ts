import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { UploadIcon, PlusIcon, Trash2Icon, AlertCircleIcon } from 'lucide-angular';
import { Course, Lesson } from '../../../../core/models/course.model';

@Component({
  selector: 'app-course-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UploadIcon,
    PlusIcon,
    Trash2Icon,
    AlertCircleIcon
  ],
  template: `
    <form [formGroup]="courseForm" (ngSubmit)="onSubmit()" class="max-w-4xl mx-auto p-6">
      <div class="bg-white rounded-lg shadow-sm border border-gray-100">
        <div class="p-6 border-b border-gray-100">
          <h2 class="text-lg font-semibold text-gray-900">
            {{ course ? 'Edit Course' : 'Create New Course' }}
          </h2>
        </div>
        <div class="p-6 space-y-6">
          <!-- Course Thumbnail -->
          <div
            class="relative flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg"
            [class.border-indigo-300]="dragActive"
            [class.bg-indigo-50]="dragActive"
            (dragenter)="handleDrag($event)"
            (dragleave)="handleDrag($event)"
            (dragover)="handleDrag($event)"
            (drop)="handleDrop($event)"
          >
            @if (previewUrl) {
              <div class="relative w-full aspect-video">
                <img
                  [src]="previewUrl"
                  alt="Course thumbnail preview"
                  class="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  (click)="clearThumbnail()"
                  class="absolute top-2 right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
                >
                  <lucide-trash-2 class="w-4 h-4"></lucide-trash-2>
                </button>
              </div>
            } @else {
              <div class="space-y-1 text-center">
                <lucide-upload class="mx-auto h-12 w-12 text-gray-400"></lucide-upload>
                <div class="flex text-sm text-gray-600">
                  <label class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      class="sr-only"
                      accept="image/*"
                      (change)="handleFile($event)"
                    />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            }
          </div>

          <!-- Course Details -->
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Course Title
              </label>
              <input
                type="text"
                formControlName="title"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                formControlName="description"
                rows="4"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Price ($)
                </label>
                <input
                  type="number"
                  formControlName="price"
                  min="0"
                  step="0.01"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  formControlName="category"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Lessons -->
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-medium text-gray-900">Lessons</h3>
              <button
                type="button"
                (click)="addLesson()"
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                <lucide-plus class="h-4 w-4 mr-2"></lucide-plus>
                Add Lesson
              </button>
            </div>

            <div formArrayName="lessons" class="space-y-4">
              @for (lesson of lessons.controls; track $index) {
                <div [formGroupName]="$index" class="bg-gray-50 p-4 rounded-lg space-y-4 relative">
                  <button
                    type="button"
                    (click)="removeLesson($index)"
                    class="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                  >
                    <lucide-trash-2 class="h-5 w-5"></lucide-trash-2>
                  </button>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">
                      Lesson Title
                    </label>
                    <input
                      type="text"
                      formControlName="title"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      formControlName="description"
                      rows="2"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">
                      Duration (hours)
                    </label>
                    <input
                      type="number"
                      formControlName="duration"
                      min="0"
                      step="0.5"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-4">
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            [disabled]="courseForm.invalid || isLoading"
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md disabled:opacity-50"
          >
            {{ isLoading ? 'Saving...' : 'Save Course' }}
          </button>
        </div>
      </div>
    </form>
  `
})
export class CourseEditorComponent {
  courseForm: FormGroup;
  isLoading = false;
  dragActive = false;
  previewUrl = '';
  thumbnail: File | null = null;

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      lessons: this.fb.array([])
    });

    // Add initial lesson
    this.addLesson();
  }

  get lessons() {
    return this.courseForm.get('lessons') as FormArray;
  }

  addLesson() {
    const lessonForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      duration: [0, [Validators.required, Validators.min(0)]],
      order: [this.lessons.length + 1]
    });

    this.lessons.push(lessonForm);
  }

  removeLesson(index: number) {
    this.lessons.removeAt(index);
  }

  handleDrag(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      this.dragActive = true;
    } else if (e.type === 'dragleave') {
      this.dragActive = false;
    }
  }

  handleDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.dragActive = false;
    
    if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
      this.handleFile(e.dataTransfer.files[0]);
    }
  }

  handleFile(file: File) {
    this.thumbnail = file;
    const url = URL.createObjectURL(file);
    this.previewUrl = url;
  }

  clearThumbnail() {
    this.thumbnail = null;
    this.previewUrl = '';
  }

  onSubmit() {
    if (this.courseForm.valid) {
      this.isLoading = true;
      const formData = this.courseForm.value;
      console.log('Course form submitted:', formData);
      // TODO: Implement course creation/update
      this.isLoading = false;
    }
  }
}