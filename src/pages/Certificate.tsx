import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Download, Share2, Trophy } from "lucide-react";
import { courses } from "@/data/courses";

const Certificate = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12 animate-fade-in">
            <Award className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Certificate of Completion</h1>
            <p className="text-xl text-muted-foreground">
              This certifies that you have successfully completed {course.title}
            </p>
          </div>

          {/* Certificate Card */}
          <Card className="shadow-elegant animate-scale-in">
            <CardContent className="p-12">
              <div className="text-center">
                <div className="mb-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg">
                    <Trophy className="w-14 h-14 text-yellow-100" />
                  </div>
                  <div className="inline-block px-8 py-3 rounded-lg mb-6" style={{ 
                    background: 'var(--gradient-primary)'
                  }}>
                    <span className="text-primary-foreground font-bold text-lg">LearnHub Certificate</span>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Presented to <span className="font-semibold text-foreground">Student Name</span>
                </p>

                <div className="border-t border-b py-6 mb-8">
                  <div className="grid grid-cols-2 gap-8 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Instructor</p>
                      <p className="font-semibold text-lg">{course.instructor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Completion Date</p>
                      <p className="font-semibold text-lg">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold">{course.duration}</p>
                  </div>
                  <div className="w-px bg-border"></div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Lessons</p>
                    <p className="font-semibold">{course.lessons.length}</p>
                  </div>
                  <div className="w-px bg-border"></div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Level</p>
                    <p className="font-semibold">{course.level}</p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="hero" size="lg">
                    <Download className="h-5 w-5" />
                    Download Certificate
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificate Actions */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Share your achievement with friends and colleagues
            </p>
            <Link to="/certificates">
              <Button variant="outline" size="lg">
                View All Certificates
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Certificate;
