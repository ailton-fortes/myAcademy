import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { XIcon } from 'lucide-angular';
import { Post, PostCategory } from '../../../../core/models/post.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, XIcon],
  template: `
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 class="text-xl font-semibold text-gray-900">Create New Post</h2>
          <button
            (click)="close.emit()"
            class="text-gray-400 hover:text-gray-500"
          >
            <lucide-x class="w-6 h-6"></lucide-x>
          </button>
        </div>

        <form [formGroup]="postForm" (ngSubmit)="onSubmit()" class="p-6 space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              formControlName="title"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              formControlName="content"
              rows="4"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              formControlName="category"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="discussion">Discussion</option>
              <option value="question">Question</option>
              <option value="announcement">Announcement</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <div class="mt-1 flex items-center space-x-2">
              <input
                type="text"
                [formControl]="tagInput"
                (keyup.enter)="addTag()"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Add a tag"
              />
              <button
                type="button"
                (click)="addTag()"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
            <div class="mt-2 flex flex-wrap gap-2">
              @for (tag of tags; track tag) {
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {{ tag }}
                  <button
                    type="button"
                    (click)="removeTag(tag)"
                    class="ml-1 text-indigo-600 hover:text-indigo-800"
                  >
                    <lucide-x class="w-3 h-3"></lucide-x>
                  </button>
                </span>
              }
            </div>
          </div>

          <div class="flex justify-end space-x-4">
            <button
              type="button"
              (click)="close.emit()"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="postForm.invalid"
              class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class CreatePostComponent {
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<Omit<Post, 'id' | 'createdAt' | 'updatedAt'>>();

  postForm: FormGroup;
  tagInput = this.fb.control('');
  tags: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['discussion' as PostCategory, Validators.required]
    });
  }

  addTag(): void {
    const tag = this.tagInput.value.trim().toLowerCase();
    if (tag && !this.tags.includes(tag)) {
      this.tags.push(tag);
      this.tagInput.reset();
    }
  }

  removeTag(tagToRemove: string): void {
    this.tags = this.tags.filter(tag => tag !== tagToRemove);
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.authService.currentUser$.subscribe(user => {
        if (user) {
          this.submit.emit({
            ...this.postForm.value,
            author: user,
            tags: this.tags,
            likes: 0,
            replies: []
          });
        }
      });
    }
  }
}
