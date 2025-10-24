import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { courses } from "@/data/courses";
import { CreditCard, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Enroll = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === id);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      if (course.price === 0) {
        toast.success("Successfully enrolled in free course!");
      } else {
        toast.success("Payment processed successfully!");
      }
      navigate(`/enrollment-success/${course.id}`);
    }, 2000);
  };

  const isFree = course.price === 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            {isFree ? "Complete Your Free Enrollment" : "Complete Your Enrollment"}
          </h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    {isFree ? "Enrollment Information" : "Payment Information"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleEnroll} className="space-y-6">
                    {!isFree && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input id="cardName" placeholder="John Doe" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" type="password" maxLength={3} required />
                          </div>
                        </div>

                        <Separator />
                      </>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>

                    {isFree && (
                      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                        <p className="text-sm font-medium text-success">
                          This is a free course! No payment required.
                        </p>
                      </div>
                    )}

                    {!isFree && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Lock className="h-4 w-4" />
                        <span>Your payment information is secure and encrypted</span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : isFree ? "Enroll for Free" : `Pay $${course.price} & Enroll`}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">{course.title}</p>
                    <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Course Price</span>
                      <span>{isFree ? "FREE" : `$${course.price}`}</span>
                    </div>
                    {!isFree && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax</span>
                        <span>$0.00</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">{isFree ? "FREE" : `$${course.price}`}</span>
                  </div>

                  <div className="bg-secondary p-4 rounded-lg space-y-2 text-sm">
                    <p className="font-semibold">What's included:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>✓ Lifetime access</li>
                      <li>✓ {course.lessons.length} lessons</li>
                      <li>✓ Certificate of completion</li>
                      <li>✓ Community support</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Enroll;
