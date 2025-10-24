import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, TrendingUp, Award, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";
import heroImage from "@/assets/hero-learning.jpg";

const Index = () => {
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-24 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold backdrop-blur-sm">
                <Award className="h-4 w-4" />
                <span>Learn from Industry Experts</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                Master New Skills
                <span className="block bg-gradient-primary bg-clip-text text-transparent mt-2">
                  Anytime, Anywhere
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Join thousands of learners advancing their careers with expert-led courses.
                Track your progress, earn certificates, and unlock your potential.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/courses">
                  <Button size="lg" className="h-14 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                    <BookOpen className="h-5 w-5" />
                    Explore Courses
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" size="lg" className="h-14 px-8 text-base font-semibold">
                    Start Learning
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-6">
                <div>
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm text-muted-foreground">Courses</div>
                </div>
                <div className="h-12 w-px bg-border"></div>
                <div>
                  <div className="text-3xl font-bold">50K+</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </div>
                <div className="h-12 w-px bg-border"></div>
                <div>
                  <div className="text-3xl font-bold">4.9</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </div>
            </div>
            <div className="animate-scale-in lg:block relative">
              <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-3xl"></div>
              <img
                src={heroImage}
                alt="Students learning online"
                className="relative rounded-3xl shadow-2xl w-full border border-border/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/50">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center animate-fade-in p-8 rounded-2xl hover:bg-card transition-all hover:shadow-lg">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-primary mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <GraduationCap className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Expert-Led Courses</h3>
              <p className="text-muted-foreground leading-relaxed">Learn from industry professionals with real-world experience</p>
            </div>
            <div className="group text-center animate-fade-in p-8 rounded-2xl hover:bg-card transition-all hover:shadow-lg" style={{ animationDelay: '0.1s' }}>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-primary mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <TrendingUp className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Track Progress</h3>
              <p className="text-muted-foreground leading-relaxed">Monitor your learning journey with detailed analytics</p>
            </div>
            <div className="group text-center animate-fade-in p-8 rounded-2xl hover:bg-card transition-all hover:shadow-lg" style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-primary mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Award className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Earn Certificates</h3>
              <p className="text-muted-foreground leading-relaxed">Get recognized for your achievements with official certificates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <TrendingUp className="h-4 w-4" />
              <span>Most Popular</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              Featured Courses
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Start your learning journey with our most popular courses
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/courses">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base font-semibold">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container text-center relative">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 tracking-tight">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join our community and take the first step towards achieving your goals
          </p>
          <Link to="/courses">
            <Button variant="secondary" size="lg" className="h-14 px-10 text-base font-semibold shadow-xl hover:shadow-2xl transition-all">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-card border-t">
        <div className="container">
          <div className="flex flex-col items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <img src="/LearnHub-Logo.svg" alt="LearnHub" className="h-8 w-8" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">LearnHub</span>
            </Link>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">Courses</Link>
              <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
              <Link to="/certificates" className="text-muted-foreground hover:text-primary transition-colors">Certificates</Link>
              <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">Support</Link>
            </div>
            <div className="text-center text-muted-foreground text-sm">
              <p>&copy; 2024 LearnHub. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
