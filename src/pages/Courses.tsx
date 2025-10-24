import { useState } from "react";
import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");

  const categories = ["all", ...Array.from(new Set(courses.map(c => c.category)))];
  const levels = ["all", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
    const matchesLevel = levelFilter === "all" || course.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">All Courses</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Explore our comprehensive collection of courses
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map(level => (
                <SelectItem key={level} value={level}>
                  {level === "all" ? "All Levels" : level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No courses found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Courses;
