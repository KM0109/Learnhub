import { Quiz } from "@/types/quiz";

export const quizzes: Quiz[] = [
  {
    id: "quiz-0-1",
    courseId: "0",
    title: "Python Basics Quiz",
    description: "Test your understanding of Python fundamentals, variables, and functions",
    xp: 150,
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        question: "What is the correct way to create a variable in Python?",
        points: 10,
        options: [
          { id: "q1-a", text: "var x = 5", isCorrect: false },
          { id: "q1-b", text: "x = 5", isCorrect: true },
          { id: "q1-c", text: "int x = 5", isCorrect: false },
          { id: "q1-d", text: "create x = 5", isCorrect: false },
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
          { id: "q2-d", text: "define", isCorrect: false },
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
          { id: "q3-d", text: "Returns a value", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "Which of the following is a valid Python data type?",
        points: 10,
        options: [
          { id: "q4-a", text: "string", isCorrect: false },
          { id: "q4-b", text: "str", isCorrect: true },
          { id: "q4-c", text: "text", isCorrect: false },
          { id: "q4-d", text: "varchar", isCorrect: false },
        ],
      },
      {
        id: "q5",
        question: "What is the output of: print(2 ** 3)?",
        points: 10,
        options: [
          { id: "q5-a", text: "5", isCorrect: false },
          { id: "q5-b", text: "6", isCorrect: false },
          { id: "q5-c", text: "8", isCorrect: true },
          { id: "q5-d", text: "9", isCorrect: false },
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
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        question: "Which operator is used for equality comparison in Python?",
        points: 10,
        options: [
          { id: "q1-a", text: "=", isCorrect: false },
          { id: "q1-b", text: "==", isCorrect: true },
          { id: "q1-c", text: "===", isCorrect: false },
          { id: "q1-d", text: "eq", isCorrect: false },
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
          { id: "q2-d", text: "foreach i in 10:", isCorrect: false },
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
          { id: "q3-d", text: "end", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "What does the 'continue' statement do in a loop?",
        points: 10,
        options: [
          { id: "q4-a", text: "Exits the loop", isCorrect: false },
          { id: "q4-b", text: "Skips to the next iteration", isCorrect: true },
          { id: "q4-c", text: "Restarts the loop", isCorrect: false },
          { id: "q4-d", text: "Pauses the loop", isCorrect: false },
        ],
      },
      {
        id: "q5",
        question: "Which statement checks multiple conditions?",
        points: 10,
        options: [
          { id: "q5-a", text: "if-then", isCorrect: false },
          { id: "q5-b", text: "if-elif-else", isCorrect: true },
          { id: "q5-c", text: "switch-case", isCorrect: false },
          { id: "q5-d", text: "select-when", isCorrect: false },
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
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        question: "Which keyword is used to handle exceptions in Python?",
        points: 10,
        options: [
          { id: "q1-a", text: "catch", isCorrect: false },
          { id: "q1-b", text: "except", isCorrect: true },
          { id: "q1-c", text: "handle", isCorrect: false },
          { id: "q1-d", text: "error", isCorrect: false },
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
          { id: "q2-d", text: "To ignore errors", isCorrect: false },
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
          { id: "q3-d", text: "exception()", isCorrect: false },
        ],
      },
      {
        id: "q4",
        question: "What exception is raised when dividing by zero?",
        points: 10,
        options: [
          { id: "q4-a", text: "ValueError", isCorrect: false },
          { id: "q4-b", text: "ZeroDivisionError", isCorrect: true },
          { id: "q4-c", text: "ArithmeticError", isCorrect: false },
          { id: "q4-d", text: "MathError", isCorrect: false },
        ],
      },
      {
        id: "q5",
        question: "Which statement is always executed in exception handling?",
        points: 10,
        options: [
          { id: "q5-a", text: "try", isCorrect: false },
          { id: "q5-b", text: "except", isCorrect: false },
          { id: "q5-c", text: "finally", isCorrect: true },
          { id: "q5-d", text: "else", isCorrect: false },
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
