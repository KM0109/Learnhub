import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCheck, Download, Share2, Award } from "lucide-react";
import { courses } from "@/data/courses";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import badgeIcon from "@/assets/badge-icon.png";

const Certificates = () => {
  const [completedCourses] = useState(
    courses.filter(c => c.progress === 100 && c.completionDate)
  );

  const handleDownload = (courseTitle: string) => {
    toast.success(`Downloading certificate for ${courseTitle}`);
  };

  const handleShare = () => {
    toast.success("Certificate link copied to clipboard!");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container py-12">
        <div className="mb-8 flex items-center gap-3">
          <FileCheck className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-4xl font-bold">My Certificates</h1>
            <p className="text-lg text-muted-foreground mt-2">
              {completedCourses.length} {completedCourses.length === 1 ? 'certificate' : 'certificates'} earned
            </p>
          </div>
        </div>

        {completedCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-elegant transition-all animate-fade-in">
                <div className="p-8 text-center" style={{ 
                  background: 'var(--gradient-primary)'
                }}>
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
                    <Award className="h-12 w-12 text-yellow-900" strokeWidth={2.5} />
                  </div>
                  <Badge className="bg-white/20 text-primary-foreground backdrop-blur border-0">
                    LearnHub Certificate
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-1 line-clamp-2 min-h-[56px]">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">by {course.instructor}</p>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Completed</span>
                      <span className="font-semibold">
                        {new Date(course.completionDate!).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-semibold">{course.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Level</span>
                      <span className="font-semibold">{course.level}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <Link to={`/certificate/${course.id}`}>
                      <Button variant="hero" size="sm" className="w-full">
                        <Award className="h-4 w-4 mr-2" />
                        View Certificate
                      </Button>
                    </Link>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(course.title)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleShare}
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-semibold mb-2">No certificates earned yet</p>
            <p className="text-sm text-muted-foreground mb-6">Complete courses to earn your LearnHub certificates!</p>
            <Link to="/courses">
              <Button variant="hero" size="lg">
                Browse Courses
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Certificates;
