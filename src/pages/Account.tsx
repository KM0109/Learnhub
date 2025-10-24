import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import BadgeCard from "@/components/BadgeCard";
import MilestoneCard from "@/components/MilestoneCard";
import { mockUserProfile } from "@/data/gamification";
import { Link } from "react-router-dom";
import {
  Award,
  TrendingUp,
  Flame,
  Clock,
  BookOpen,
  Edit,
  Trophy,
  Zap,
  Star,
  Target,
  FileCheck,
  User
} from "lucide-react";

const Account = () => {
  const user = mockUserProfile;
  const xpProgress = (user.xp / user.xpToNextLevel) * 100;
  const earnedBadges = user.badges.filter(b => b.earned);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="container py-8 max-w-7xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-6 shadow-card animate-fade-in">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-primary shadow-card bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <User className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-base md:text-lg shadow-card">
                  {user.level}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="min-w-0">
                    <h1 className="text-2xl md:text-3xl font-bold mb-1">{user.name}</h1>
                    <p className="text-muted-foreground truncate">{user.email}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Member since {new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="flex-shrink-0">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="font-semibold text-sm">Level {user.level}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {user.xp} / {user.xpToNextLevel} XP
                      </span>
                    </div>
                    <Progress value={xpProgress} className="h-2.5" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {user.xpToNextLevel - user.xp} XP to level {user.level + 1}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-card border shadow-sm">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Flame className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xl font-bold">{user.streak}</p>
                        <p className="text-xs text-muted-foreground">Day Streak</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-lg bg-card border shadow-sm">
                      <div className="w-9 h-9 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                        <Trophy className="h-4 w-4 text-success" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xl font-bold">{user.coursesCompleted}</p>
                        <p className="text-xs text-muted-foreground">Completed</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-lg bg-card border shadow-sm">
                      <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Award className="h-4 w-4 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xl font-bold">{earnedBadges.length}</p>
                        <p className="text-xs text-muted-foreground">Badges</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-lg bg-card border shadow-sm">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xl font-bold">{user.hoursLearned}</p>
                        <p className="text-xs text-muted-foreground">Hours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card className="animate-fade-in shadow-card" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total XP Earned</CardTitle>
              <Zap className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{user.totalXp.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">Keep learning to earn more!</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in shadow-card" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Longest Streak</CardTitle>
              <TrendingUp className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{user.longestStreak} days</div>
              <p className="text-xs text-muted-foreground mt-1">
                Current: {user.streak} days
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in shadow-card" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Learning Rate</CardTitle>
              <BookOpen className="h-5 w-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">
                {Math.round(user.hoursLearned / user.coursesCompleted)}h
              </div>
              <p className="text-xs text-muted-foreground mt-1">Per course average</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="badges" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="badges" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Badges
            </TabsTrigger>
            <TabsTrigger value="milestones" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Milestones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="badges" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Achievement Badges</CardTitle>
                  <Badge variant="outline">
                    {earnedBadges.length} / {user.badges.length} Unlocked
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {user.badges.map((badge) => (
                    <BadgeCard key={badge.id} badge={badge} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-primary text-primary-foreground">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center text-3xl">
                    🎯
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Keep Going!</h3>
                    <p className="text-primary-foreground/90 text-sm">
                      You're doing great! Complete more lessons to unlock rare badges.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Learning Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.milestones.map((milestone) => (
                    <MilestoneCard key={milestone.id} milestone={milestone} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary">
                    <div className="text-4xl">🏅</div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Reach Level 10</h4>
                      <p className="text-sm text-muted-foreground">Unlock exclusive avatar frames</p>
                    </div>
                    <Badge>Level 10</Badge>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary">
                    <div className="text-4xl">💎</div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Complete 5 Courses</h4>
                      <p className="text-sm text-muted-foreground">Get 2000 XP bonus</p>
                    </div>
                    <Badge>5 Courses</Badge>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary">
                    <div className="text-4xl">👑</div>
                    <div className="flex-1">
                      <h4 className="font-semibold">100 Day Streak</h4>
                      <p className="text-sm text-muted-foreground">Master Learner badge</p>
                    </div>
                    <Badge>100 Days</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
