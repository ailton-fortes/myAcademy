export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  instructor: {
    id: string;
    name: string;
    avatar?: string;
  };
  thumbnail: string;
  category: string;
  rating: number;
  enrolledCount: number;
  duration: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  order: number;
}