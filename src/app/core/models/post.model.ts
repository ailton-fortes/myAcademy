import { User } from './user.model';

export type PostCategory = 'discussion' | 'question' | 'announcement';

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  category: PostCategory;
  tags: string[];
  likes: number;
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
}

export interface Reply {
  id: string;
  content: string;
  author: User;
  likes: number;
  createdAt: string;
  updatedAt: string;
}
