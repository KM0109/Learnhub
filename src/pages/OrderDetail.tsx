import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { courses } from "@/data/courses";
import { ShoppingBag, ExternalLink, ArrowLeft, Calendar, Clock, BookOpen, BarChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  
  // Find the course by extracting the course ID from orderId
  // Format: ORD-{timestamp}-{courseId}
  const courseId = orderId?.split('-').pop();
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="container py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
          <Button onClick={() => navigate("/orders")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
        </main>
      </div>
    );
  }

  const orderDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="container py-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/orders")}
          className="mb-6 hover:bg-primary/10 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Order Details</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Order #{orderId}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl mb-2">{course.title}</CardTitle>
                    <p className="text-muted-foreground">by {course.instructor}</p>
                  </div>
                  <Badge className="bg-success/10 text-success border-success/20">
                    Completed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full rounded-lg overflow-hidden mb-6">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <p className="text-muted-foreground mb-6">{course.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Purchased</p>
                      <p className="font-semibold text-sm">{orderDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="font-semibold text-sm">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Lessons</p>
                      <p className="font-semibold text-sm">{course.lessons.length}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <BarChart className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Level</p>
                      <p className="font-semibold text-sm">{course.level}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What You Get</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Lifetime access to all course materials</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>{course.lessons.length} comprehensive lessons</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Certificate of completion</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Community support and discussions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Access to all future updates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Order ID</span>
                    <span className="font-mono">{orderId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Order Date</span>
                    <span className="font-semibold">{orderDate}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Course Price</span>
                    <span className="font-semibold">${course.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Paid</span>
                    <span className="text-primary">${course.price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Link to={`/course/${course.id}`} className="block">
              <Button variant="hero" size="lg" className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Go to Course
              </Button>
            </Link>

            <Card className="bg-secondary/50">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground text-center">
                  Need help with your order? Visit our{" "}
                  <Link to="/support" className="text-primary hover:underline font-semibold">
                    Support Center
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderDetail;
