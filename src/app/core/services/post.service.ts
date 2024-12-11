import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Post, PostCategory } from '../models/post.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private mockPosts: Post[] = [
    {
      id: '1',
      title: 'Tips for Learning React Hooks',
      content: 'What are your best practices for using React Hooks? Share your experiences!',
      author: {
        id: 'user1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'instructor',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
      },
      category: 'discussion',
      tags: ['react', 'javascript', 'frontend'],
      likes: 24,
      replies: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  getPosts(): Observable<Post[]> {
    return of(this.mockPosts).pipe(delay(500));
  }

  createPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Observable<Post> {
    const newPost: Post = {
      ...post,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.mockPosts.unshift(newPost);
    return of(newPost).pipe(delay(500));
  }

  likePost(postId: string): Observable<Post> {
    const post = this.mockPosts.find(p => p.id === postId);
    if (post) {
      post.likes += 1;
      return of(post).pipe(delay(500));
    }
    throw new Error('Post not found');
  }

  addReply(postId: string, content: string, author: User): Observable<Post> {
    const post = this.mockPosts.find(p => p.id === postId);
    if (post) {
      post.replies.push({
        id: Math.random().toString(36).substr(2, 9),
        content,
        author,
        likes: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return of(post).pipe(delay(500));
    }
    throw new Error('Post not found');
  }
}
