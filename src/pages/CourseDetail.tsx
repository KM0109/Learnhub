import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Users, Clock, PlayCircle, FileText, CheckCircle, Award, Heart, Zap, Download, Lock } from "lucide-react";
import { courses } from "@/data/courses";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === id);
  const [isWishlisted, setIsWishlisted] = useState(course?.wishlisted || false);

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
        {/* Hero Section */}
        <section className="bg-gradient-hero py-8">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Badge className="mb-3">{course.category}</Badge>
                <h1 className="text-4xl font-bold mb-3">{course.title}</h1>
                <p className="text-lg text-muted-foreground mb-4">{course.description}</p>
                
                <div className="flex flex-wrap items-center gap-6 mb-4">
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

                <p className="text-muted-foreground">Instructor: <span className="font-semibold text-foreground">{course.instructor}</span></p>
              </div>

              <div>
                <Card className="shadow-elegant sticky top-24">
                  <CardContent className="p-6">
                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center mb-4">
                      <span className="text-4xl font-bold text-primary">${course.price}</span>
                    </div>
                    <Link to={`/enroll/${course.id}`} className="block mb-3">
                      <Button variant="hero" size="lg" className="w-full">
                        Enroll Now
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
                        <span className="text-muted-foreground">Certificate</span>
                        <span className="font-semibold flex items-center gap-1">
                          <Award className="h-4 w-4 text-accent" />
                          Yes
                        </span>
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
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Button
                            variant="outline"
                            size="lg"
                            className="w-full"
                            onClick={handleDownloadPDF}
                            disabled={!isCourseCompleted}
                          >
                            {isCourseCompleted ? (
                              <>
                                <Download className="h-5 w-5 mr-2" />
                                Download PDF Summary
                              </>
                            ) : (
                              <>
                                <Lock className="h-5 w-5 mr-2" />
                                PDF Summary Locked
                              </>
                            )}
                          </Button>
                        </div>
                      </TooltipTrigger>
                      {!isCourseCompleted && (
                        <TooltipContent>
                          <p>Complete the course to unlock the PDF summary</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Course Content */}
        <section className="container py-8">
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-bold mb-6">Course Content</h2>
            <Card>
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full" defaultValue="lessons">
                  <AccordionItem value="lessons">
                    <AccordionTrigger className="text-lg font-semibold">
                      <div className="flex items-center gap-3">
                        <span>Course Curriculum</span>
                        <Badge variant="outline">{course.lessons.length} lessons</Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          {course.totalXp} XP
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-3">
                        {course.lessons.map((lesson, index) => (
                          <div key={lesson.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors">
                            <div className="flex items-center gap-3 flex-1">
                              {lesson.type === 'video' ? (
                                <PlayCircle className="h-5 w-5 text-primary" />
                              ) : (
                                <FileText className="h-5 w-5 text-primary" />
                              )}
                              <div className="flex-1">
                                <p className="font-medium">{index + 1}. {lesson.title}</p>
                                <p className="text-xs text-muted-foreground capitalize">{lesson.type}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-muted-foreground">{lesson.duration} min</span>
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <Zap className="h-3 w-3 text-accent" />
                                {lesson.xp}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetail;
