import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, CheckCircle } from "lucide-react";
import { courses } from "@/data/courses";
import { Separator } from "@/components/ui/separator";

const EnrollmentSuccess = () => {
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

  const orderDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const orderId = `ORD-${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-6">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Enrollment Successful!</h1>
            <p className="text-xl text-muted-foreground">
              You've successfully enrolled in {course.title}
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Order Details</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="font-semibold">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-semibold">{orderDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Course</span>
                  <span className="font-semibold">{course.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Instructor</span>
                  <span className="font-semibold">{course.instructor}</span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Course Price</span>
                  <span>${course.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Paid</span>
                  <span className="text-primary">${course.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <CheckCircle className="h-10 w-10 text-success mb-4" />
                <h3 className="text-xl font-semibold mb-2">Start Learning</h3>
                <p className="text-muted-foreground mb-4">
                  Begin your course and track your progress through each lesson.
                </p>
                <Link to="/dashboard">
                  <Button variant="hero" className="w-full">
                    Go to Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Award className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Earn Your Certificate</h3>
                <p className="text-muted-foreground mb-4">
                  Complete all lessons to earn your official certificate of completion.
                </p>
                <Link to={`/course/${course.id}`}>
                  <Button variant="outline" className="w-full">
                    View Course
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnrollmentSuccess;
