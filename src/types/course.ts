export interface Lesson {
  id: string;
  title: string;
  duration: number;
  completed?: boolean;
  type: 'video' | 'reading' | 'quiz';
  xp: number;
  videoId?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  rating: number;
  students: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  thumbnail: string;
  lessons: Lesson[];
  enrolled?: boolean;
  progress?: number;
  wishlisted?: boolean;
  purchased?: boolean;
  completionDate?: string;
  totalXp: number;
}
