import { useParams, Link, useNavigate } from "react-router-dom";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Users, Clock, PlayCircle, FileText, CheckCircle, Award, Heart, Zap, Download, Lock, BookOpen, XCircle, ArrowLeft } from "lucide-react";
import { courses } from "@/data/courses";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import VideoPlayer from "@/components/VideoPlayer";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import InlineQuiz from "@/components/InlineQuiz";
import { getQuizById } from "@/data/quizzes";
import AccessibleImage from "@/components/AccessibleImage";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === id);
  const [isWishlisted, setIsWishlisted] = useState(course?.wishlisted || false);
  const [selectedLesson, setSelectedLesson] = useState(course?.lessons.find(l => l.videoId) || null);
  const [lessonProgress, setLessonProgress] = useState<Record<string, number>>({});
  const [unlockedLessons, setUnlockedLessons] = useState<Set<string>>(new Set([course?.lessons[0]?.id || ""]));
  const [clickCounts, setClickCounts] = useState<Record<string, number>>({});
  const [manuallyCompleted, setManuallyCompleted] = useState<Set<string>>(new Set());
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);

  // Reset state when course changes
  useEffect(() => {
    if (!course) return;
    
    setIsWishlisted(course.wishlisted || false);
    setSelectedLesson(course.lessons.find(l => l.videoId) || null);
    setClickCounts({});
    setManuallyCompleted(new Set());
    setActiveQuizId(null);
  }, [id, course]);

  useEffect(() => {
    if (!course) return;

    const unlocked = new Set<string>([course.lessons[0]?.id]);
    const progressMap: Record<string, number> = {};

    course.lessons.forEach((lesson, index) => {
      if (lesson.watchedPercent !== undefined) {
        progressMap[lesson.id] = lesson.watchedPercent;
      } else if (lesson.completed) {
        progressMap[lesson.id] = 100;
      }

      if (lesson.completed || (lesson.watchedPercent && lesson.watchedPercent >= 90)) {
        if (index < course.lessons.length - 1) {
          unlocked.add(course.lessons[index + 1].id);
        }
      }

      const savedProgress = localStorage.getItem(`video_progress_${course.id}_${lesson.id}`);
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        const watchedPercent = (progress.watchedSeconds / (lesson.duration * 60)) * 100;
        progressMap[lesson.id] = watchedPercent;

        if (watchedPercent >= 90) {
          const currentIndex = course.lessons.findIndex(l => l.id === lesson.id);
          if (currentIndex < course.lessons.length - 1) {
            unlocked.add(course.lessons[currentIndex + 1].id);
          }
        }
      }
    });

    setLessonProgress(progressMap);
    setUnlockedLessons(unlocked);
  }, [id, course]);

  const handleProgressUpdate = (progress: number, lessonId: string) => {
    setLessonProgress(prev => ({ ...prev, [lessonId]: progress }));

    if (progress >= 90 && course) {
      const currentIndex = course.lessons.findIndex(l => l.id === lessonId);
      if (currentIndex < course.lessons.length - 1) {
        const nextLesson = course.lessons[currentIndex + 1];
        setUnlockedLessons(prev => new Set([...prev, nextLesson.id]));
      }
    }
  };

  const handleVideoComplete = (lessonId: string) => {
    if (!course) return;

    const currentIndex = course.lessons.findIndex(l => l.id === lessonId);
    if (currentIndex < course.lessons.length - 1) {
      const nextLesson = course.lessons[currentIndex + 1];
      if (nextLesson.videoId && unlockedLessons.has(nextLesson.id)) {
        setTimeout(() => {
          setSelectedLesson(nextLesson);
          toast.success(`Now playing: ${nextLesson.title}`);
        }, 2000);
      }
    } else {
      toast.success("Congratulations! You've completed all videos in this course!");
    }
  };

  const isLessonLocked = (lessonId: string, index: number) => {
    if (!course.enrolled && !course.purchased && index === 0) return true;
    if (index === 0) return false;
    return !unlockedLessons.has(lessonId);
  };

  const handleQuizComplete = (passed: boolean, quizId: string) => {
    if (passed) {
      setManuallyCompleted(prev => new Set([...prev, quizId]));
      setLessonProgress({ ...lessonProgress, [quizId]: 100 });

      const currentIndex = course!.lessons.findIndex(l => l.id === quizId);
      if (currentIndex < course!.lessons.length - 1) {
        const nextLesson = course!.lessons[currentIndex + 1];
        setUnlockedLessons(prev => new Set([...prev, nextLesson.id]));
      }

      setTimeout(() => {
        setActiveQuizId(null);
      }, 500);
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
          <Link to="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleDownloadPDF = () => {
    if (course.progress === 100 && course.completionDate) {
      toast.success("Downloading course summary PDF...");
    } else {
      toast.error("Complete the course to unlock the PDF summary");
    }
  };

  const totalDuration = course.lessons.reduce((acc, lesson) => acc + lesson.duration, 0);
  const isCourseCompleted = course.progress === 100 && course.completionDate;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main>
        <section className="bg-gradient-hero py-8 pb-12">
          <div className="container">
            <Button
              variant="ghost"
              className="mb-4 -ml-2 hover:bg-primary/10 hover:text-foreground"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <Badge className="mb-3">{course.category}</Badge>
                  <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
                  <p className="text-muted-foreground mb-6">by <span className="font-semibold text-foreground">{course.instructor}</span></p>

                  <div className="flex flex-wrap items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-accent text-accent" />
                      <span className="font-semibold">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span>{course.duration} total</span>
                    </div>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>

                  <p className="text-lg text-muted-foreground">{course.description}</p>
                </div>

                {/* Course Info Card - Shows above video player on mobile */}
                <Card className="lg:hidden shadow-elegant">
                  <CardContent className="p-6">
                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                      <AccessibleImage src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center mb-4">
                      {course.price === 0 ? (
                        <div>
                          <span className="text-4xl font-bold text-success">FREE</span>
                          <p className="text-sm text-muted-foreground mt-1">No payment required</p>
                        </div>
                      ) : (
                        <span className="text-4xl font-bold text-primary">${course.price}</span>
                      )}
                    </div>
                    <Link to={`/enroll/${course.id}`} className="block mb-3">
                      <Button variant="hero" size="lg" className="w-full">
                        {course.price === 0 ? "Enroll for Free" : "Enroll Now"}
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={handleWishlistToggle}
                    >
                      <Heart
                        className={`h-5 w-5 mr-2 transition-colors ${
                          isWishlisted ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                      {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    </Button>
                    <Separator className="my-4" />
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Level</span>
                        <span className="font-semibold">{course.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-semibold">{course.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lessons</span>
                        <span className="font-semibold">{course.lessons.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total XP</span>
                        <span className="font-semibold flex items-center gap-1">
                          <Zap className="h-4 w-4 text-accent" />
                          {course.totalXp}
                        </span>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-3 text-sm mb-4">
                      <h4 className="font-semibold text-base">Certificate Status</h4>
                      <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Award className={`h-5 w-5 ${isCourseCompleted ? 'text-success' : 'text-muted-foreground'}`} />
                          <span className="font-medium">Certificate</span>
                        </div>
                        {isCourseCompleted ? (
                          <Badge className="bg-success text-success-foreground">Unlocked</Badge>
                        ) : (
                          <Badge variant="secondary">
                            <Lock className="h-3 w-3 mr-1" />
                            Locked
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {activeQuizId && (() => {
                  const quiz = getQuizById(activeQuizId);
                  return quiz ? (
                    <InlineQuiz quiz={quiz} onComplete={(passed) => handleQuizComplete(passed, activeQuizId)} />
                  ) : null;
                })()}

                {selectedLesson && selectedLesson.videoId && !activeQuizId && (
                  <VideoPlayer
                    videoId={selectedLesson.videoId}
                    lessonId={selectedLesson.id}
                    courseId={course.id}
                    title={selectedLesson.title}
                    duration={selectedLesson.duration}
                    onProgressUpdate={handleProgressUpdate}
                    onVideoComplete={handleVideoComplete}
                  />
                )}

                <div>
                  <h2 className="text-2xl font-bold mb-6">Course Content</h2>
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <Accordion type="single" collapsible className="w-full" defaultValue="lessons">
                        <AccordionItem value="lessons" className="border-none">
                          <AccordionTrigger className="hover:no-underline hover:text-primary transition-colors pt-2 pb-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full text-left">
                              <span className="text-base sm:text-xl font-bold">Course Curriculum</span>
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant="outline" className="text-xs sm:text-sm">{course.lessons.length} lessons</Badge>
                                <Badge variant="outline" className="flex items-center gap-1 text-xs sm:text-sm">
                                  <Zap className="h-3 w-3" />
                                  {course.totalXp} XP
                                </Badge>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pt-4">
                              {course.lessons.map((lesson, index) => {
                                const locked = isLessonLocked(lesson.id, index);
                                const progress = lessonProgress[lesson.id] || (lesson.completed ? 100 : 0);
                                const isCompleted = progress >= 90 || manuallyCompleted.has(lesson.id);

                                let statusBadge;
                                if (isCompleted) {
                                  statusBadge = (
                                    <Badge className="bg-success text-success-foreground hover:bg-success">
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Completed
                                    </Badge>
                                  );
                                } else if (locked) {
                                  statusBadge = (
                                    <Badge variant="secondary" className="bg-muted text-muted-foreground">
                                      <Lock className="h-3 w-3 mr-1" />
                                      Locked
                                    </Badge>
                                  );
                                } else if (lesson.type === 'quiz') {
                                  statusBadge = (
                                    <Badge className="bg-purple-600 text-white hover:bg-purple-700">
                                      <BookOpen className="h-3 w-3 mr-1" />
                                      Unlocked
                                    </Badge>
                                  );
                                } else {
                                  statusBadge = (
                                    <Badge variant="outline" className="border-primary text-primary">
                                      Unlocked
                                    </Badge>
                                  );
                                }

                                const handleLessonClick = () => {
                                  if (locked) {
                                    return;
                                  }

                                  if (lesson.type === 'quiz') {
                                    if (!isCompleted) {
                                      setActiveQuizId(lesson.id);
                                      setSelectedLesson(null);
                                    }
                                    return;
                                  } else if (lesson.videoId && !locked) {
                                    setActiveQuizId(null);
                                    setSelectedLesson(lesson);
                                  }
                                };

                                const handleUnlock = () => {
                                  setUnlockedLessons(prev => new Set([...prev, lesson.id]));
                                  toast.success(`${lesson.title} unlocked!`);
                                };

                                const handleMarkComplete = () => {
                                  setManuallyCompleted(prev => new Set([...prev, lesson.id]));
                                  setLessonProgress({ ...lessonProgress, [lesson.id]: 100 });
                                  toast.success(`${lesson.title} marked as complete!`);

                                  const currentIndex = course.lessons.findIndex(l => l.id === lesson.id);
                                  if (currentIndex < course.lessons.length - 1) {
                                    const nextLesson = course.lessons[currentIndex + 1];
                                    setUnlockedLessons(prev => new Set([...prev, nextLesson.id]));
                                  }
                                };

                                const handleMarkIncomplete = () => {
                                  setManuallyCompleted(prev => {
                                    const newSet = new Set(prev);
                                    newSet.delete(lesson.id);
                                    return newSet;
                                  });
                                  setLessonProgress({ ...lessonProgress, [lesson.id]: 0 });
                                  toast.success(`${lesson.title} marked as incomplete`);
                                };

                                let lessonIcon;
                                let lessonTypeText;

                                if (lesson.type === 'video') {
                                  lessonIcon = <PlayCircle className="h-5 w-5" />;
                                  lessonTypeText = "Video";
                                } else if (lesson.type === 'quiz') {
                                  lessonIcon = <BookOpen className="h-5 w-5" />;
                                  lessonTypeText = "Quiz";
                                } else {
                                  lessonIcon = <FileText className="h-5 w-5" />;
                                  lessonTypeText = "Reading";
                                }

                                return (
                                  <React.Fragment key={lesson.id}>
                                    <ContextMenu>
                                      <ContextMenuTrigger>
                                        <div
                                          className={`p-3 sm:p-4 rounded-xl border transition-all ${
                                            locked ? 'opacity-60 cursor-not-allowed border-muted bg-muted/20' : 'cursor-pointer border-border hover:border-primary hover:shadow-sm'
                                          } ${
                                            selectedLesson?.id === lesson.id || activeQuizId === lesson.id
                                              ? 'bg-primary/10 border-primary shadow-md'
                                              : 'bg-card'
                                          }`}
                                          onClick={handleLessonClick}
                                        >
                                          <div className="flex gap-2 sm:gap-4 items-center">
                                            <div className="flex items-center justify-center min-w-[40px] h-10 sm:min-w-[48px] sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 text-primary font-bold shrink-0 text-base sm:text-lg">
                                              {index + 1}
                                            </div>

                                            <div className="flex-1 min-w-0 flex flex-col gap-2 sm:gap-3">
                                              <div className="shrink-0">
                                                {statusBadge}
                                              </div>

                                              <div className="flex flex-col gap-1.5">
                                                <h4 className="font-semibold text-sm sm:text-base leading-tight sm:leading-snug">
                                                  {lesson.title}
                                                </h4>
                                                <div className="flex items-center gap-1.5 text-xs sm:text-sm flex-wrap">
                                                  {lessonIcon}
                                                  <span className="font-medium text-muted-foreground">{lessonTypeText}</span>
                                                  <span className="text-muted-foreground">•</span>
                                                  <span className="text-muted-foreground">{lesson.duration} min</span>
                                                  <span className="text-muted-foreground">•</span>
                                                  <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
                                                  <span className="font-bold text-accent">{lesson.xp} XP</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </ContextMenuTrigger>
                                      <ContextMenuContent>
                                        <ContextMenuItem onClick={handleUnlock}>
                                          <Lock className="h-4 w-4 mr-2" />
                                          Mark as Unlocked
                                        </ContextMenuItem>
                                        <ContextMenuItem onClick={handleMarkComplete}>
                                          <CheckCircle className="h-4 w-4 mr-2" />
                                          Mark as Complete
                                        </ContextMenuItem>
                                        <ContextMenuItem onClick={() => {
                                          setUnlockedLessons(prev => {
                                            const newSet = new Set(prev);
                                            newSet.delete(lesson.id);
                                            return newSet;
                                          });
                                          setManuallyCompleted(prev => {
                                            const newSet = new Set(prev);
                                            newSet.delete(lesson.id);
                                            return newSet;
                                          });
                                          setLessonProgress({ ...lessonProgress, [lesson.id]: 0 });
                                          toast.success(`${lesson.title} marked as locked`);
                                        }}>
                                          <Lock className="h-4 w-4 mr-2" />
                                          Mark as Locked
                                        </ContextMenuItem>
                                      </ContextMenuContent>
                                    </ContextMenu>
                                    {index < course.lessons.length - 1 && (
                                      <div className="my-2 sm:my-3" />
                                    )}
                                  </React.Fragment>
                                );
                              })}
                              <Separator className="my-4" />
                              <p className="text-sm text-muted-foreground text-center py-2">
                                Complete all lessons to earn your certificate
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>

                  {/* What You'll Learn section - Shows after Course Content on mobile, after Course Content on desktop */}
                  <Card className="mt-8">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex gap-3">
                          <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                          <p className="text-sm">Master the fundamentals and advanced concepts</p>
                        </div>
                        <div className="flex gap-3">
                          <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                          <p className="text-sm">Build real-world projects from scratch</p>
                        </div>
                        <div className="flex gap-3">
                          <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                          <p className="text-sm">Get industry-recognized certification</p>
                        </div>
                        <div className="flex gap-3">
                          <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                          <p className="text-sm">Learn best practices and current standards</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* What You'll Get section - Shows after What You'll Learn on all screens */}
                  <Card className="mt-8">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">What You'll Get</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              isCourseCompleted ? 'bg-success/10' : 'bg-muted'
                            }`}>
                              <FileText className={`h-6 w-6 ${isCourseCompleted ? 'text-success' : 'text-muted-foreground'}`} />
                            </div>
                            <div>
                              <p className="font-semibold">PDF Course Summary</p>
                              <p className="text-sm text-muted-foreground">Comprehensive course notes and key takeaways</p>
                            </div>
                          </div>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <Button
                                  variant={isCourseCompleted ? "default" : "secondary"}
                                  size="sm"
                                  onClick={handleDownloadPDF}
                                  disabled={!isCourseCompleted}
                                >
                                  {isCourseCompleted ? (
                                    <>
                                      <Download className="h-4 w-4 mr-2" />
                                      Download
                                    </>
                                  ) : (
                                    <>
                                      <Lock className="h-4 w-4 mr-2" />
                                      Locked
                                    </>
                                  )}
                                </Button>
                              </div>
                            </TooltipTrigger>
                            {!isCourseCompleted && (
                              <TooltipContent>
                                <p>Complete the course to unlock</p>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              isCourseCompleted ? 'bg-accent/10' : 'bg-muted'
                            }`}>
                              <Award className={`h-6 w-6 ${isCourseCompleted ? 'text-accent' : 'text-muted-foreground'}`} />
                            </div>
                            <div>
                              <p className="font-semibold">Certificate of Completion</p>
                              <p className="text-sm text-muted-foreground">Shareable certificate upon course completion</p>
                            </div>
                          </div>
                          {isCourseCompleted ? (
                            <Link to={`/certificate/${course.id}`}>
                              <Button variant="default" size="sm">
                                <Award className="h-4 w-4 mr-2" />
                                View Certificate
                              </Button>
                            </Link>
                          ) : (
                            <Button variant="secondary" size="sm" disabled>
                              <Lock className="h-4 w-4 mr-2" />
                              Locked
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="hidden lg:block">
                <Card className="shadow-elegant sticky top-24">
                  <CardContent className="p-6">
                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                      <AccessibleImage src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center mb-4">
                      {course.price === 0 ? (
                        <div>
                          <span className="text-4xl font-bold text-success">FREE</span>
                          <p className="text-sm text-muted-foreground mt-1">No payment required</p>
                        </div>
                      ) : (
                        <span className="text-4xl font-bold text-primary">${course.price}</span>
                      )}
                    </div>
                    <Link to={`/enroll/${course.id}`} className="block mb-3">
                      <Button variant="hero" size="lg" className="w-full">
                        {course.price === 0 ? "Enroll for Free" : "Enroll Now"}
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={handleWishlistToggle}
                    >
                      <Heart
                        className={`h-5 w-5 mr-2 transition-colors ${
                          isWishlisted ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                      {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    </Button>
                    <Separator className="my-4" />
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Level</span>
                        <span className="font-semibold">{course.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-semibold">{course.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lessons</span>
                        <span className="font-semibold">{course.lessons.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total XP</span>
                        <span className="font-semibold flex items-center gap-1">
                          <Zap className="h-4 w-4 text-accent" />
                          {course.totalXp}
                        </span>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-3 text-sm mb-4">
                      <h4 className="font-semibold text-base">Certificate Status</h4>
                      <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Award className={`h-5 w-5 ${isCourseCompleted ? 'text-success' : 'text-muted-foreground'}`} />
                          <span className="font-medium">Certificate</span>
                        </div>
                        {isCourseCompleted ? (
                          <Badge className="bg-success text-success-foreground">Unlocked</Badge>
                        ) : (
                          <Badge variant="secondary">
                            <Lock className="h-3 w-3 mr-1" />
                            Locked
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetail;
