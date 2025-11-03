import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { courses } from "@/data/courses";
import { ShoppingBag, ExternalLink, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Orders = () => {
  const purchasedCourses = courses.filter(c => c.purchased || c.enrolled).map((course, index) => ({
    ...course,
    orderDate: new Date(Date.now() - (index * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    orderId: `ORD-${(Date.now() - (index * 100000)).toString().slice(-8)}-${course.id}`
  }));

  const unpurchasedCourses = courses.filter(c => !c.purchased && !c.enrolled);

  const totalSpent = purchasedCourses.reduce((sum, course) => sum + course.price, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="container py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingBag className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-4xl font-bold">My Orders</h1>
              <p className="text-lg text-muted-foreground mt-2">
                {purchasedCourses.length} {purchasedCourses.length === 1 ? 'order' : 'orders'} • Total spent: ₹{totalSpent.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {purchasedCourses.length > 0 ? (
          <>
            <div className="space-y-4">
              {purchasedCourses.map((course) => (
                <Link
                  key={course.id}
                  to={`/order/${course.orderId}`}
                  className="block"
                >
                  <Card className="overflow-hidden hover:shadow-elegant transition-all animate-fade-in group cursor-pointer">
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-[240px_1fr] gap-0">
                        <div className="relative w-full h-[200px] md:h-[240px] bg-muted flex-shrink-0 overflow-hidden">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-sm font-mono text-muted-foreground">
                                  {course.orderId}
                                </span>
                              </div>
                              <h3 className="text-lg font-semibold mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                                {course.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                            </div>
                            <Badge className="bg-success/10 text-success border-success/20 flex-shrink-0">
                              Completed
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between mt-4 pt-4 border-t">
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                              <span>{course.orderDate}</span>
                              <span>{course.lessons.length} lessons</span>
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="text-xl font-bold text-primary">₹{course.price}</p>
                              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {unpurchasedCourses.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Not Purchased Yet</h2>
                <p className="text-muted-foreground mb-6">
                  The following courses are not in your orders. First videos are locked until purchased.
                </p>
                <div className="space-y-4">
                  {unpurchasedCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-[240px_1fr] gap-0">
                          <div className="relative w-full h-[200px] md:h-[240px] bg-muted flex-shrink-0 overflow-hidden">
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-full h-full object-cover opacity-60"
                            />
                          </div>
                          <div className="p-6">
                            <div className="flex items-start justify-between gap-4 mb-4">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold mb-1 line-clamp-2">
                                  {course.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                              </div>
                              <Badge variant="outline" className="flex-shrink-0">
                                Not Purchased
                              </Badge>
                            </div>

                            <div className="flex items-center justify-between mt-4 pt-4 border-t">
                              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <span>{course.lessons.length} lessons</span>
                                <span>{course.duration}</span>
                              </div>
                              <Link to={`/course/${course.id}`}>
                                <Button variant="outline" size="sm">
                                  View Course
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">You haven't purchased any courses yet.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
