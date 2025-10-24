import { useState } from "react";
import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlistedCourses] = useState(courses.filter(c => c.wishlisted));

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container py-12">
        <div className="mb-8 flex items-center gap-3">
          <Heart className="h-8 w-8 text-red-500 fill-red-500" />
          <div>
            <h1 className="text-4xl font-bold">My Wishlist</h1>
            <p className="text-lg text-muted-foreground mt-2">
              {wishlistedCourses.length} {wishlistedCourses.length === 1 ? 'course' : 'courses'} saved for later
            </p>
          </div>
        </div>

        {wishlistedCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-semibold mb-2">Your wishlist is empty</p>
            <p className="text-sm text-muted-foreground mb-6">Start adding courses you're interested in!</p>
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

export default Wishlist;
