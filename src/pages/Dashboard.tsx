import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, BookOpen, Clock, TrendingUp, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/courses";

const Dashboard = () => {
  // Mock enrolled courses with progress
  const enrolledCourses = [
    { ...courses[0], enrolled: true, progress: 65 },
    { ...courses[1], enrolled: true, progress: 30 },
    { ...courses[2], enrolled: true, progress: 90 },
  ];

  const totalHoursLearned = 47;
  const coursesCompleted = 3;
  const certificatesEarned = 2;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Learning Dashboard</h1>
          <p className="text-lg text-muted-foreground">Track your progress and continue your journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Courses In Progress
              </CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{enrolledCourses.length}</div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Hours Learned
              </CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalHoursLearned}</div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed Courses
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{coursesCompleted}</div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Certificates
              </CardTitle>
              <Award className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{certificatesEarned}</div>
            </CardContent>
          </Card>
        </div>

        {/* Continue Learning */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <CourseCard key={course.id} course={course} showProgress={true} />
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">My Certificates</h2>
            <Link to="/certificates">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.filter(c => c.progress === 100 && c.completionDate).map((course, index) => (
              <Card key={course.id} className="hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      index === 0 ? 'bg-primary/10' : index === 1 ? 'bg-success/10' : 'bg-accent/10'
                    }`}>
                      <FileCheck className={`h-8 w-8 ${
                        index === 0 ? 'text-primary' : index === 1 ? 'text-success' : 'text-accent'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{course.title}</h4>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                    <Link to={`/certificate/${course.id}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Learning Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="font-medium">Completed: JavaScript Essentials</p>
                  <p className="text-sm text-muted-foreground">Web Development Bootcamp</p>
                </div>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="font-medium">Earned Certificate</p>
                  <p className="text-sm text-muted-foreground">UI/UX Design Masterclass</p>
                </div>
                <span className="text-sm text-muted-foreground">1 day ago</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="font-medium">Started: Data Visualization</p>
                  <p className="text-sm text-muted-foreground">Python for Data Science</p>
                </div>
                <span className="text-sm text-muted-foreground">3 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
