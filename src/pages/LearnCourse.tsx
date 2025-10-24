import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoPlayer from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, PlayCircle, Zap, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Course, Lesson } from "@/types/course";
import { toast } from "sonner";

const LearnCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseData();
  }, [id]);

  const fetchCourseData = async () => {
    try {
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (courseError) throw courseError;
      if (!courseData) {
        toast.error("Course not found");
        navigate('/courses');
        return;
      }

      const { data: lessonsData, error: lessonsError } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', id)
        .order('position');

      if (lessonsError) throw lessonsError;

      setCourse(courseData as Course);
      setLessons(lessonsData as Lesson[]);
      if (lessonsData && lessonsData.length > 0) {
        setCurrentLesson(lessonsData[0] as Lesson);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      toast.error("Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  const markLessonComplete = (lessonId: string) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
    toast.success("Lesson completed! XP earned", {
      icon: <Zap className="h-4 w-4 text-accent" />
    });
  };

  const goToNextLesson = () => {
    if (!currentLesson) return;
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex < lessons.length - 1) {
      setCurrentLesson(lessons[currentIndex + 1]);
    }
  };

  const goToPreviousLesson = () => {
    if (!currentLesson) return;
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex > 0) {
      setCurrentLesson(lessons[currentIndex - 1]);
    }
  };

  const progress = lessons.length > 0
    ? (completedLessons.size / lessons.length) * 100
    : 0;

  const totalXpEarned = lessons
    .filter(l => completedLessons.has(l.id))
    .reduce((sum, l) => sum + l.xp, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-20 text-center">
          <p>Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
          <Button onClick={() => navigate('/courses')}>Back to Courses</Button>
        </div>
      </div>
    );
  }

  const currentLessonIndex = lessons.findIndex(l => l.id === currentLesson.id);
  const isFirstLesson = currentLessonIndex === 0;
  const isLastLesson = currentLessonIndex === lessons.length - 1;
  const isCurrentLessonCompleted = completedLessons.has(currentLesson.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="bg-gradient-hero py-4">
          <div className="container">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
                <p className="text-muted-foreground">by {course.instructor}</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Zap className="h-4 w-4 text-accent" />
                  {totalXpEarned} / {course.total_xp} XP
                </Badge>
                {progress === 100 && (
                  <Button onClick={() => navigate(`/certificate/${course.id}`)}>
                    <Award className="h-4 w-4 mr-2" />
                    View Certificate
                  </Button>
                )}
              </div>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              {completedLessons.size} of {lessons.length} lessons completed ({Math.round(progress)}%)
            </p>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardContent className="p-6">
                  {currentLesson.video_id ? (
                    <VideoPlayer
                      videoId={currentLesson.video_id}
                      title={currentLesson.title}
                    />
                  ) : (
                    <div className="aspect-video bg-muted flex items-center justify-center rounded-lg">
                      <p className="text-muted-foreground">Video not available</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{currentLesson.title}</h2>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Lesson {currentLessonIndex + 1} of {lessons.length}</span>
                        <span>{currentLesson.duration} minutes</span>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Zap className="h-3 w-3 text-accent" />
                          {currentLesson.xp} XP
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-6">
                    <Button
                      variant="outline"
                      onClick={goToPreviousLesson}
                      disabled={isFirstLesson}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>

                    {!isCurrentLessonCompleted && (
                      <Button
                        onClick={() => markLessonComplete(currentLesson.id)}
                        className="flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Complete
                      </Button>
                    )}

                    {isCurrentLessonCompleted && (
                      <Badge className="flex-1 justify-center py-2 bg-success">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </Badge>
                    )}

                    <Button
                      variant="outline"
                      onClick={goToNextLesson}
                      disabled={isLastLesson}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Course Content</h3>
                  <ScrollArea className="h-[600px]">
                    <div className="space-y-2">
                      {lessons.map((lesson, index) => {
                        const isCompleted = completedLessons.has(lesson.id);
                        const isCurrent = lesson.id === currentLesson.id;

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => setCurrentLesson(lesson)}
                            className={`w-full text-left p-3 rounded-lg transition-colors ${
                              isCurrent
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-secondary'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {isCompleted ? (
                                <CheckCircle className="h-5 w-5 text-success shrink-0" />
                              ) : (
                                <PlayCircle className={`h-5 w-5 shrink-0 ${isCurrent ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className={`font-medium text-sm truncate ${isCurrent ? 'text-primary-foreground' : ''}`}>
                                  {index + 1}. {lesson.title}
                                </p>
                                <div className={`flex items-center gap-2 text-xs ${isCurrent ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                                  <span>{lesson.duration} min</span>
                                  <span>•</span>
                                  <span>{lesson.xp} XP</span>
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LearnCourse;
