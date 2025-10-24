import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Award, Target, Lightbulb, Heart } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="bg-gradient-hero py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About LearnHub</h1>
              <p className="text-xl text-muted-foreground">
                Empowering learners worldwide with accessible, high-quality education that transforms lives and careers.
              </p>
            </div>
          </div>
        </section>

        <section className="container py-16">
          <div className="max-w-5xl mx-auto">
            <Card className="mb-12">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  At LearnHub, we believe that education is the key to unlocking human potential. Our mission is to make world-class learning accessible to everyone, everywhere. We partner with industry experts and leading educators to create courses that are engaging, practical, and designed to help you achieve your goals.
                </p>
                <p className="text-lg text-muted-foreground">
                  Whether you're looking to advance your career, learn a new skill, or explore a passion, LearnHub provides the tools, resources, and community support you need to succeed.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">1000+</h3>
                  <p className="text-muted-foreground">Expert-Led Courses</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">50K+</h3>
                  <p className="text-muted-foreground">Active Learners</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">25K+</h3>
                  <p className="text-muted-foreground">Certificates Earned</p>
                </CardContent>
              </Card>
            </div>

            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                        <p className="text-muted-foreground">
                          We partner with the best instructors and continuously improve our courses to deliver exceptional learning experiences.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center shrink-0">
                        <Lightbulb className="h-6 w-6 text-success" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                        <p className="text-muted-foreground">
                          We embrace new technologies and teaching methods to create engaging, interactive learning experiences.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                        <Users className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Community</h3>
                        <p className="text-muted-foreground">
                          We foster a supportive learning community where students can connect, collaborate, and grow together.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center shrink-0">
                        <Heart className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                        <p className="text-muted-foreground">
                          We're committed to making quality education accessible and affordable for learners from all backgrounds.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="bg-gradient-hero">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Join Our Learning Community</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Start your learning journey today and discover thousands of courses designed to help you achieve your goals. Whether you're advancing your career or exploring new interests, we're here to support you every step of the way.
                </p>
                <Badge className="text-lg px-6 py-2">
                  Over 50,000 learners trust LearnHub
                </Badge>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
