import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Clock, Heart } from "lucide-react";
import { Course } from "@/types/course";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useState } from "react";

interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
}

const CourseCard = ({ course, showProgress = false }: CourseCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(course.wishlisted || false);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <Link to={`/course/${course.id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in cursor-pointer h-full flex flex-col border-border/50">
        <div className="aspect-video overflow-hidden relative flex-shrink-0 bg-muted">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          <Badge className="absolute top-4 right-4 bg-primary/95 text-primary-foreground backdrop-blur-sm shadow-lg font-semibold">
            {course.level}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg hover:scale-110 transition-all"
            onClick={handleWishlistToggle}
          >
            <Heart
              className={`h-5 w-5 transition-all duration-300 ${
                isWishlisted ? "fill-red-500 text-red-500 scale-110" : "text-muted-foreground"
              }`}
            />
          </Button>
        </div>
        <CardContent className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 text-xs mb-3">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">{course.category}</span>
          </div>
          <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-5 flex-1 leading-relaxed">
            {course.description}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
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
        <CardFooter className="p-6 pt-0 flex items-center justify-between mt-auto border-t border-border/50 pt-4">
          <p className="text-sm text-muted-foreground font-medium">by {course.instructor}</p>
          <p className="font-bold text-2xl bg-gradient-primary bg-clip-text text-transparent">${course.price}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
