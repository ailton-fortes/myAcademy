import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessageSquareIcon, ThumbsUpIcon, TagIcon } from 'lucide-angular';
import { Post } from '../../../../core/models/post.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MessageSquareIcon, ThumbsUpIcon, TagIcon],
  template: `
    <div class="space-y-6">
      @for (post of posts; track post.id) {
        <div class="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow">
          <div class="p-6">
            <div class="flex items-center space-x-3">
              <img
                [src]="post.author.avatar"
                [alt]="post.author.name"
                class="w-10 h-10 rounded-full"
              />
              <div>
                <p class="text-sm font-medium text-gray-900">
                  {{ post.author.name }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ post.createdAt | date }}
                </p>
              </div>
            </div>
            <h3 class="mt-4 text-lg font-medium text-gray-900">
              {{ post.title }}
            </h3>
            <p class="mt-2 text-gray-600">{{ post.content }}</p>
            <div class="mt-4 flex items-center space-x-4">
              <button
                (click)="like.emit(post.id)"
                class="flex items-center text-gray-500 hover:text-indigo-600"
              >
                <lucide-thumbs-up class="w-4 h-4 mr-1"></lucide-thumbs-up>
                <span class="text-sm">{{ post.likes }}</span>
              </button>
              <div class="flex items-center text-gray-500">
                <lucide-message-square class="w-4 h-4 mr-1"></lucide-message-square>
                <span class="text-sm">{{ post.replies.length }}</span>
              </div>
              <div class="flex items-center space-x-2">
                @for (tag of post.tags; track tag) {
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    <lucide-tag class="w-3 h-3 mr-1"></lucide-tag>
                    {{ tag }}
                  </span>
                }
              </div>
            </div>

            <!-- Replies -->
            @if (post.replies.length > 0) {
              <div class="mt-4 space-y-4">
                @for (reply of post.replies; track reply.id) {
                  <div class="pl-4 border-l-2 border-gray-200">
                    <div class="flex items-center space-x-3">
                      <img
                        [src]="reply.author.avatar"
                        [alt]="reply.author.name"
                        class="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p class="text-sm font-medium text-gray-900">
                          {{ reply.author.name }}
                        </p>
                        <p class="text-sm text-gray-500">
                          {{ reply.createdAt | date }}
                        </p>
                      </div>
                    </div>
                    <p class="mt-2 text-sm text-gray-600">{{ reply.content }}</p>
                  </div>
                }
              </div>
            }

            <!-- Reply Form -->
            @if (isAuthenticated()) {
              <div class="mt-4">
                <div class="flex items-center space-x-2">
                  <input
                    type="text"
                    [formControl]="replyControls[post.id]"
                    (keyup.enter)="submitReply(post.id)"
                    placeholder="Write a reply..."
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    (click)="submitReply(post.id)"
                    class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700"
                  >
                    Reply
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class PostListComponent {
  @Input() posts: Post[] = [];
  @Output() like = new EventEmitter<string>();
  @Output() reply = new EventEmitter<{ postId: string; content: string }>();

  replyControls: { [key: string]: FormControl } = {};

  constructor(private authService: AuthService) {}

  ngOnChanges(): void {
    // Initialize reply controls for new posts
    this.posts.forEach(post => {
      if (!this.replyControls[post.id]) {
        this.replyControls[post.id] = new FormControl('');
      }
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  submitReply(postId: string): void {
    const content = this.replyControls[postId].value?.trim();
    if (content) {
      this.reply.emit({ postId, content });
      this.replyControls[postId].reset();
    }
  }
}
