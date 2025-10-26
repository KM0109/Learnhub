import { Quiz } from "@/types/quiz";

export const quizzes: Quiz[] = [
  {
    id: "quiz-0-6",
    courseId: "0",
    title: "Python Fundamentals Quiz",
    description: "Test your understanding of Python basics, conditionals, loops, and exceptions",
    xp: 150,
    passingScore: 60,
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        question: "What is the correct way to create a variable in Python?",
        points: 10,
        options: [
          { id: "q1-a", text: "var x = 5", isCorrect: false },
          { id: "q1-b", text: "x = 5", isCorrect: true },
          { id: "q1-c", text: "int x = 5", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "Which operator is used for equality comparison in Python?",
        points: 10,
        options: [
          { id: "q2-a", text: "=", isCorrect: false },
          { id: "q2-b", text: "==", isCorrect: true },
          { id: "q2-c", text: "===", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "Which keyword is used to exit a loop prematurely?",
        points: 10,
        options: [
          { id: "q3-a", text: "exit", isCorrect: false },
          { id: "q3-b", text: "stop", isCorrect: false },
          { id: "q3-c", text: "break", isCorrect: true },
        ],
      },
      {
        id: "q4",
        question: "Which keyword is used to handle exceptions in Python?",
        points: 10,
        options: [
          { id: "q4-a", text: "catch", isCorrect: false },
          { id: "q4-b", text: "except", isCorrect: true },
          { id: "q4-c", text: "handle", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "quiz-0-7",
    courseId: "0",
    title: "Advanced Python Concepts Quiz",
    description: "Test your knowledge of libraries, unit tests, file I/O, regular expressions, and OOP",
    xp: 150,
    passingScore: 60,
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        question: "What is the purpose of the 'import' statement in Python?",
        points: 10,
        options: [
          { id: "q1-a", text: "To create a new module", isCorrect: false },
          { id: "q1-b", text: "To use external libraries and modules", isCorrect: true },
          { id: "q1-c", text: "To export functions", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "Which module is commonly used for unit testing in Python?",
        points: 10,
        options: [
          { id: "q2-a", text: "pytest", isCorrect: true },
          { id: "q2-b", text: "testlib", isCorrect: false },
          { id: "q2-c", text: "checktest", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "How do you open a file for reading in Python?",
        points: 10,
        options: [
          { id: "q3-a", text: "open('file.txt', 'r')", isCorrect: true },
          { id: "q3-b", text: "read('file.txt')", isCorrect: false },
          { id: "q3-c", text: "file.open('r')", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "What is the purpose of the '__init__' method in Python classes?",
        points: 10,
        options: [
          { id: "q4-a", text: "To delete an object", isCorrect: false },
          { id: "q4-b", text: "To initialize object attributes", isCorrect: true },
          { id: "q4-c", text: "To import a class", isCorrect: false },
        ],
      },
    ],
  },
];

export const getQuizzesByCourseId = (courseId: string): Quiz[] => {
  return quizzes.filter(quiz => quiz.courseId === courseId);
};

export const getQuizById = (quizId: string): Quiz | undefined => {
  return quizzes.find(quiz => quiz.id === quizId);
};
