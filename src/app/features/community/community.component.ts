import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
import { Post } from '../../core/models/post.model';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { MessageSquareIcon, UsersIcon, TrendingUpIcon, TagIcon } from 'lucide-angular';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CreatePostComponent,
    PostListComponent,
    MessageSquareIcon,
    UsersIcon,
    TrendingUpIcon,
    TagIcon
  ],
  template: `
    <div class="min-h-screen bg-gray-50 pt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Community Header -->
        <div class="mb-8">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Community</h1>
              <p class="mt-2 text-sm text-gray-600">
                Connect with fellow learners and share your knowledge
              </p>
            </div>
            <button
              (click)="isCreatePostOpen = true"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Create Post
            </button>
          </div>

          <!-- Stats -->
          <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <lucide-users class="h-6 w-6 text-white"></lucide-users>
                  </div>
                  <div class="ml-5">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">
                        Active Members
                      </dt>
                      <dd class="mt-1 text-3xl font-semibold text-gray-900">
                        2.7k
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <lucide-message-square class="h-6 w-6 text-white"></lucide-message-square>
                  </div>
                  <div class="ml-5">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">
                        Total Posts
                      </dt>
                      <dd class="mt-1 text-3xl font-semibold text-gray-900">
                        {{ posts.length }}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <lucide-trending-up class="h-6 w-6 text-white"></lucide-trending-up>
                  </div>
                  <div class="ml-5">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">
                        Daily Active Users
                      </dt>
                      <dd class="mt-1 text-3xl font-semibold text-gray-900">
                        824
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters -->
        <div class="mb-8">
          <div class="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div class="flex-1">
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (ngModelChange)="filterPosts()"
                placeholder="Search posts..."
                class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <select
              [(ngModel)]="selectedCategory"
              (ngModelChange)="filterPosts()"
              class="block w-full sm:w-48 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">All Categories</option>
              <option value="discussion">Discussion</option>
              <option value="question">Question</option>
              <option value="announcement">Announcement</option>
            </select>
          </div>

          <!-- Tags -->
          <div class="mt-4">
            <div class="flex items-center flex-wrap gap-2">
              @for (tag of tags; track tag) {
                <button
                  (click)="toggleTag(tag)"
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm"
                  [class.bg-indigo-100]="selectedTags.includes(tag)"
                  [class.text-indigo-800]="selectedTags.includes(tag)"
                  [class.bg-gray-100]="!selectedTags.includes(tag)"
                  [class.text-gray-800]="!selectedTags.includes(tag)"
                >
                  <lucide-tag class="w-4 h-4 mr-1"></lucide-tag>
                  {{ tag }}
                </button>
              }
            </div>
          </div>
        </div>

        <!-- Post List -->
        <app-post-list
          [posts]="filteredPosts"
          (like)="likePost($event)"
          (reply)="addReply($event)"
        ></app-post-list>

        <!-- Create Post Modal -->
        @if (isCreatePostOpen) {
          <app-create-post
            (close)="isCreatePostOpen = false"
            (submit)="createPost($event)"
          ></app-create-post>
        }
      </div>
    </div>
  `
})
export class CommunityComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchQuery = '';
  selectedCategory = '';
  selectedTags: string[] = [];
  isCreatePostOpen = false;

  tags = ['react', 'javascript', 'python', 'web-development', 'data-science'];

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
      this.filterPosts();
    });
  }

  filterPosts(): void {
    this.filteredPosts = this.posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           post.content.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = !this.selectedCategory || post.category === this.selectedCategory;
      const matchesTags = this.selectedTags.length === 0 ||
                         this.selectedTags.some(tag => post.tags.includes(tag));
      
      return matchesSearch && matchesCategory && matchesTags;
    });
  }

  toggleTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index === -1) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags.splice(index, 1);
    }
    this.filterPosts();
  }

  createPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): void {
    this.postService.createPost(post).subscribe(newPost => {
      this.posts.unshift(newPost);
      this.filterPosts();
      this.isCreatePostOpen = false;
    });
  }

  likePost(postId: string): void {
    this.postService.likePost(postId).subscribe(updatedPost => {
      const index = this.posts.findIndex(p => p.id === postId);
      if (index !== -1) {
        this.posts[index] = updatedPost;
        this.filterPosts();
      }
    });
  }

  addReply(event: { postId: string; content: string }): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.postService.addReply(event.postId, event.content, user).subscribe(updatedPost => {
          const index = this.posts.findIndex(p => p.id === event.postId);
          if (index !== -1) {
            this.posts[index] = updatedPost;
            this.filterPosts();
          }
        });
      }
    });
  }
}
