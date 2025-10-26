import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { getQuizById } from "@/data/quizzes";
import { courses } from "@/data/courses";
import { Clock, Award, Zap, CheckCircle, XCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Quiz = () => {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const quiz = getQuizById(quizId || "");
  const course = courses.find(c => c.id === courseId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    if (quiz?.timeLimit) {
      setTimeRemaining(quiz.timeLimit * 60);
    }
  }, [quiz]);

  useEffect(() => {
    if (timeRemaining !== null && timeRemaining > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === null || prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining, isSubmitted]);

  if (!quiz || !course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Quiz Not Found</h1>
          <Link to={`/course/${courseId}`}>
            <Button>Back to Course</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleAnswerSelect = (optionId: string) => {
    if (!isSubmitted) {
      setAnswers({ ...answers, [currentQuestion.id]: optionId });
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    let earnedPoints = 0;
    let maxPoints = 0;

    quiz.questions.forEach(question => {
      maxPoints += question.points;
      const selectedOptionId = answers[question.id];
      if (selectedOptionId) {
        const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
        if (selectedOption?.isCorrect) {
          earnedPoints += question.points;
        }
      }
    });

    const scorePercent = Math.round((earnedPoints / maxPoints) * 100);
    setScore(scorePercent);
    setTotalPoints(earnedPoints);
    setIsSubmitted(true);

    if (scorePercent >= quiz.passingScore) {
      toast.success(`Congratulations! You passed with ${scorePercent}%! You earned ${quiz.xp} XP!`);
    } else {
      toast.error(`You scored ${scorePercent}%. You need ${quiz.passingScore}% to pass. Try again!`);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  if (isSubmitted) {
    const passed = score >= quiz.passingScore;
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="container py-12 flex-1">
          <Card className="max-w-3xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                {passed ? (
                  <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
                    <CheckCircle className="h-12 w-12 text-success" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                    <XCircle className="h-12 w-12 text-destructive" />
                  </div>
                )}
              </div>
              <CardTitle className="text-3xl">
                {passed ? "Quiz Completed!" : "Quiz Not Passed"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{score}%</div>
                <p className="text-muted-foreground">
                  You scored {totalPoints} out of {quiz.questions.reduce((sum, q) => sum + q.points, 0)} points
                </p>
              </div>

              {passed && (
                <div className="flex items-center justify-center gap-2 p-4 bg-accent/10 rounded-lg">
                  <Zap className="h-6 w-6 text-accent" />
                  <span className="text-lg font-semibold">+{quiz.xp} XP Earned!</span>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Question Review</h3>
                {quiz.questions.map((question, index) => {
                  const selectedOptionId = answers[question.id];
                  const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
                  const correctOption = question.options.find(opt => opt.isCorrect);
                  const isCorrect = selectedOption?.isCorrect || false;

                  return (
                    <Card key={question.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <Badge variant={isCorrect ? "default" : "destructive"} className={isCorrect ? "bg-success" : ""}>
                            Q{index + 1}
                          </Badge>
                          <p className="font-medium flex-1">{question.question}</p>
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-success" />
                          ) : (
                            <XCircle className="h-5 w-5 text-destructive" />
                          )}
                        </div>
                        {!isCorrect && (
                          <div className="space-y-2 text-sm">
                            <p className="text-destructive">Your answer: {selectedOption?.text || "Not answered"}</p>
                            <p className="text-success">Correct answer: {correctOption?.text}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="flex gap-4">
                <Link to={`/course/${courseId}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    Back to Course
                  </Button>
                </Link>
                {!passed && (
                  <Button
                    className="flex-1"
                    onClick={() => {
                      setIsSubmitted(false);
                      setAnswers({});
                      setCurrentQuestionIndex(0);
                      setScore(0);
                      setTotalPoints(0);
                      if (quiz.timeLimit) {
                        setTimeRemaining(quiz.timeLimit * 60);
                      }
                    }}
                  >
                    Retry Quiz
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link to={`/course/${courseId}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Course
              </Button>
            </Link>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge>{course.category}</Badge>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {timeRemaining !== null && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className={timeRemaining < 60 ? "text-destructive font-semibold" : ""}>
                        {formatTime(timeRemaining)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span>{getAnsweredCount()} / {quiz.questions.length} answered</span>
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl">{quiz.title}</CardTitle>
              <p className="text-muted-foreground">{quiz.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold">
                    Question {currentQuestionIndex + 1} of {quiz.questions.length}
                  </span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Badge variant="outline" className="mb-3">
                      Question {currentQuestionIndex + 1}
                    </Badge>
                    <h3 className="text-xl font-semibold mb-1">{currentQuestion.question}</h3>
                    <p className="text-sm text-muted-foreground">{currentQuestion.points} points</p>
                  </div>
                </div>

                <RadioGroup
                  value={answers[currentQuestion.id] || ""}
                  onValueChange={handleAnswerSelect}
                >
                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <div
                        key={option.id}
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                          answers[currentQuestion.id] === option.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => handleAnswerSelect(option.id)}
                      >
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="flex gap-2">
                  {quiz.questions.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-2 rounded-full ${
                        index === currentQuestionIndex
                          ? "bg-primary"
                          : answers[quiz.questions[index].id]
                          ? "bg-success"
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>

                {currentQuestionIndex === quiz.questions.length - 1 ? (
                  <Button onClick={handleSubmit} disabled={getAnsweredCount() === 0}>
                    Submit Quiz
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;
