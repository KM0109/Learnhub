import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { Quiz } from "@/types/quiz";
import { toast } from "sonner";

interface InlineQuizProps {
  quiz: Quiz;
  onComplete: (passed: boolean) => void;
}

const InlineQuiz = ({ quiz, onComplete }: InlineQuizProps) => {
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit * 60);
  const [results, setResults] = useState<{ [questionId: string]: boolean }>({});

  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining, isSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    if (!isSubmitted) {
      setAnswers({ ...answers, [questionId]: optionId });
    }
  };

  const handleSubmit = () => {
    const questionResults: { [questionId: string]: boolean } = {};
    let earnedPoints = 0;
    let maxPoints = 0;

    quiz.questions.forEach(question => {
      maxPoints += question.points;
      const selectedOptionId = answers[question.id];
      if (selectedOptionId) {
        const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
        const isCorrect = selectedOption?.isCorrect || false;
        questionResults[question.id] = isCorrect;
        if (isCorrect) {
          earnedPoints += question.points;
        }
      } else {
        questionResults[question.id] = false;
      }
    });

    const scorePercent = Math.round((earnedPoints / maxPoints) * 100);
    setResults(questionResults);
    setIsSubmitted(true);

    const passed = scorePercent >= quiz.passingScore;
    if (passed) {
      toast.success(`Quiz passed with ${scorePercent}%! Earned ${quiz.xp} XP!`);
    } else {
      toast.error(`Quiz failed with ${scorePercent}%. Need ${quiz.passingScore}% to pass.`);
    }

    setTimeout(() => {
      onComplete(passed);
    }, 2000);
  };

  const allAnswered = quiz.questions.every(q => answers[q.id]);

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1">{quiz.title}</h3>
              <p className="text-sm text-muted-foreground">{quiz.description}</p>
            </div>
            {!isSubmitted && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span className={timeRemaining < 60 ? "text-destructive font-semibold" : ""}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {quiz.questions.map((question, index) => {
              const isCorrect = results[question.id];
              const selectedOptionId = answers[question.id];

              return (
                <div key={question.id} className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="shrink-0">
                      {index + 1}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-medium mb-3">{question.question}</p>
                      <RadioGroup
                        value={selectedOptionId || ""}
                        onValueChange={(value) => handleAnswerSelect(question.id, value)}
                        disabled={isSubmitted}
                      >
                        <div className="space-y-2">
                          {question.options.map((option) => {
                            let optionClasses = "flex items-center space-x-3 p-3 rounded-lg border-2 transition-all";

                            if (isSubmitted) {
                              if (option.isCorrect) {
                                optionClasses += " border-success bg-success/10";
                              } else if (selectedOptionId === option.id && !option.isCorrect) {
                                optionClasses += " border-destructive bg-destructive/10";
                              } else {
                                optionClasses += " border-border opacity-60";
                              }
                            } else {
                              if (selectedOptionId === option.id) {
                                optionClasses += " border-primary bg-primary/5";
                              } else {
                                optionClasses += " border-border hover:border-primary/50 cursor-pointer";
                              }
                            }

                            return (
                              <div
                                key={option.id}
                                className={optionClasses}
                                onClick={() => !isSubmitted && handleAnswerSelect(question.id, option.id)}
                              >
                                <RadioGroupItem value={option.id} id={option.id} disabled={isSubmitted} />
                                <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                                  {option.text}
                                </Label>
                                {isSubmitted && option.isCorrect && (
                                  <CheckCircle className="h-5 w-5 text-success" />
                                )}
                                {isSubmitted && selectedOptionId === option.id && !option.isCorrect && (
                                  <XCircle className="h-5 w-5 text-destructive" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {!isSubmitted && (
            <div className="flex justify-end pt-4 border-t">
              <Button onClick={handleSubmit} disabled={!allAnswered}>
                Submit Quiz
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InlineQuiz;
