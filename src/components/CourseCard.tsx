import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Clock, Heart, Zap } from "lucide-react";
import { Course } from "@/types/course";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useState } from "react";
import AccessibleImage from "@/components/AccessibleImage";

interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
  layout?: "grid" | "list";
}

const CourseCard = ({ course, showProgress = false, layout = "grid" }: CourseCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(course.wishlisted || false);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  if (layout === "list") {
    return (
      <Link to={`/course/${course.id}`}>
        <Card className="group overflow-hidden transition-all hover:shadow-elegant animate-fade-in cursor-pointer">
          <CardContent className="p-4 flex gap-4">
            <div className="aspect-video w-32 flex-shrink-0 rounded-lg overflow-hidden">
              <AccessibleImage
                src={course.thumbnail}
                alt={course.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-primary font-semibold text-xs">{course.category}</span>
                  <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    by {course.instructor}
                  </p>
                </div>
                <Badge className="bg-card/95 text-foreground border-2 border-primary/30 backdrop-blur shadow-card hover:bg-card/95">
                  {course.level}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {course.description}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-foreground">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">{course.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {course.price === 0 ? (
                    <p className="font-bold text-success">FREE</p>
                  ) : (
                    <p className="font-bold text-primary">₹{course.price}</p>
                  )}
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-accent/10 rounded">
                    <Zap className="h-3 w-3 text-accent" />
                    <span className="text-xs font-semibold text-accent">{course.totalXp} XP</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/course/${course.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-elegant animate-fade-in cursor-pointer h-full flex flex-col">
        <div className="aspect-video overflow-hidden relative flex-shrink-0">
          <AccessibleImage
            src={course.thumbnail}
            alt={course.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <Badge className="absolute top-3 right-3 bg-card/95 text-foreground border-2 border-primary/30 backdrop-blur shadow-card transition-transform duration-200 hover:bg-card/95">
            {course.level}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 left-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur hover:bg-background"
            onClick={handleWishlistToggle}
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"
              }`}
            />
          </Button>
        </div>
        <CardContent className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <span className="text-primary font-semibold">{course.category}</span>
          </div>
          <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            by {course.instructor}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
            {course.description}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3 mt-auto">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400 flex-shrink-0" />
              <span className="font-semibold text-foreground">{course.rating}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium">{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium">{course.duration}</span>
            </div>
          </div>
          {showProgress && course.progress !== undefined && (
            <div className="mb-3">
              <Progress value={course.progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">{course.progress}% complete</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-5 pt-0 flex items-center justify-between">
          {course.price === 0 ? (
            <p className="font-bold text-lg text-success">FREE</p>
          ) : (
            <p className="font-bold text-lg text-primary">₹{course.price}</p>
          )}
          <div className="flex items-center gap-1.5 px-2 py-1.5 bg-accent/10 rounded-md">
            <Zap className="h-4 w-4 text-accent flex-shrink-0" />
            <span className="text-sm font-semibold text-accent">{course.totalXp} XP</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
