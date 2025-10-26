import { Quiz } from "@/types/quiz";

export const quizzes: Quiz[] = [
  {
    id: "quiz-0-1",
    courseId: "0",
    title: "Python Basics Quiz",
    description: "Test your understanding of Python fundamentals, variables, and functions",
    xp: 150,
    passingScore: 60,
    timeLimit: 5,
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
        question: "Which keyword is used to define a function in Python?",
        points: 10,
        options: [
          { id: "q2-a", text: "function", isCorrect: false },
          { id: "q2-b", text: "def", isCorrect: true },
          { id: "q2-c", text: "func", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "What does the print() function do in Python?",
        points: 10,
        options: [
          { id: "q3-a", text: "Saves output to a file", isCorrect: false },
          { id: "q3-b", text: "Displays output to the console", isCorrect: true },
          { id: "q3-c", text: "Creates a new variable", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "quiz-0-2",
    courseId: "0",
    title: "Conditionals and Loops Quiz",
    description: "Test your knowledge of if statements, while loops, and for loops",
    xp: 150,
    passingScore: 60,
    timeLimit: 5,
    questions: [
      {
        id: "q1",
        question: "Which operator is used for equality comparison in Python?",
        points: 10,
        options: [
          { id: "q1-a", text: "=", isCorrect: false },
          { id: "q1-b", text: "==", isCorrect: true },
          { id: "q1-c", text: "===", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "What is the correct syntax for a for loop in Python?",
        points: 10,
        options: [
          { id: "q2-a", text: "for i in range(10):", isCorrect: true },
          { id: "q2-b", text: "for (i = 0; i < 10; i++)", isCorrect: false },
          { id: "q2-c", text: "for i to 10:", isCorrect: false },
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
    ],
  },
  {
    id: "quiz-0-3",
    courseId: "0",
    title: "Exceptions and Error Handling Quiz",
    description: "Test your understanding of try-except blocks and error handling",
    xp: 150,
    passingScore: 60,
    timeLimit: 5,
    questions: [
      {
        id: "q1",
        question: "Which keyword is used to handle exceptions in Python?",
        points: 10,
        options: [
          { id: "q1-a", text: "catch", isCorrect: false },
          { id: "q1-b", text: "except", isCorrect: true },
          { id: "q1-c", text: "handle", isCorrect: false },
        ],
      },
      {
        id: "q2",
        question: "What is the purpose of the 'finally' block?",
        points: 10,
        options: [
          { id: "q2-a", text: "To handle exceptions", isCorrect: false },
          { id: "q2-b", text: "To execute code regardless of exceptions", isCorrect: true },
          { id: "q2-c", text: "To raise exceptions", isCorrect: false },
        ],
      },
      {
        id: "q3",
        question: "How do you raise an exception in Python?",
        points: 10,
        options: [
          { id: "q3-a", text: "throw Exception()", isCorrect: false },
          { id: "q3-b", text: "raise Exception()", isCorrect: true },
          { id: "q3-c", text: "error Exception()", isCorrect: false },
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
