export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  points: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  xp: number;
  passingScore: number;
  timeLimit?: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: { [questionId: string]: string };
  score: number;
  totalPoints: number;
  maxPoints: number;
  passed: boolean;
  completedAt: Date;
}
