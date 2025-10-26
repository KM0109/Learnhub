import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { courses } from "@/data/courses";
import { getTotalXPFromCourses, getProgressToNextLevel, levels } from "@/data/levels";
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
  User,
  Gift,
  Sparkles,
  Lock
} from "lucide-react";
import { useState } from "react";

const Account = () => {
  const user = mockUserProfile;
  const xpProgress = (user.xp / user.xpToNextLevel) * 100;
  const earnedBadges = user.badges.filter(b => b.earned);
  const [isLevelOpen, setIsLevelOpen] = useState(false);

  const totalXP = getTotalXPFromCourses(courses);
  const { current: currentLevel, next: nextLevel, progress: levelProgress } = getProgressToNextLevel(totalXP);

  const level8 = levels.find(l => l.level === 8);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="container py-8 max-w-7xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-6 shadow-card animate-fade-in">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
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
                  <Link to="/profile">
                    <Button variant="outline" size="sm" className="flex-shrink-0">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                    <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg bg-card border shadow-sm">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Flame className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-lg sm:text-xl font-bold">{user.streak}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">Week Streak</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg bg-card border shadow-sm">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                        <Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-lg sm:text-xl font-bold">{user.coursesCompleted}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">Completed</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg bg-card border shadow-sm">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-lg sm:text-xl font-bold">{earnedBadges.length}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">Badges</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg bg-card border shadow-sm">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-lg sm:text-xl font-bold">{user.hoursLearned}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">Hours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Level Progression & Rewards Section */}
        <Card className="mb-6 shadow-card">
          <CardContent className="p-4 sm:p-6">
            <Collapsible open={isLevelOpen} onOpenChange={setIsLevelOpen}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                    <Star className="w-5 h-5 sm:w-7 sm:h-7 text-white fill-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold">Level 6</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Total: {totalXP.toLocaleString()} XP</p>
                  </div>
                </div>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Gift className="h-4 w-4 mr-2" />
                    {isLevelOpen ? 'Hide' : 'View'} Rewards
                  </Button>
                </CollapsibleTrigger>
              </div>

              {nextLevel && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-semibold">Progress to Level 7</span>
                    <span className="text-muted-foreground">
                      {totalXP.toLocaleString()} / {nextLevel.minXP.toLocaleString()} XP
                    </span>
                  </div>
                  <Progress value={levelProgress} className="h-2" />
                </div>
              )}

              <CollapsibleContent>
                <div className="mt-6 pt-6 border-t space-y-6">
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-accent" />
                      Unlocked Rewards from Levels
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {currentLevel.rewards.map((reward) => (
                        <Card key={reward.id} className="bg-accent/5">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                                {reward.type === 'coupon' ? (
                                  <Gift className="h-5 w-5 text-accent" />
                                ) : reward.type === 'badge' ? (
                                  <Award className="h-5 w-5 text-accent" />
                                ) : (
                                  <Sparkles className="h-5 w-5 text-accent" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h5 className="font-semibold mb-1">{reward.title}</h5>
                                <p className="text-sm text-muted-foreground mb-2">{reward.description}</p>
                                {reward.code && (
                                  <Badge variant="outline" className="font-mono">
                                    {reward.code}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {level8 && (
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Lock className="h-5 w-5 text-muted-foreground" />
                        Locked Rewards - Unlocks at Level 8
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {level8.rewards.map((reward) => (
                          <Card key={reward.id} className="bg-muted/30 border-dashed opacity-70">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                  <Lock className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-semibold mb-1 flex items-center gap-2">
                                    {reward.title}
                                    <Badge variant="secondary" className="text-xs">
                                      <Lock className="h-3 w-3 mr-1" />
                                      Lvl 8
                                    </Badge>
                                  </h5>
                                  <p className="text-sm text-muted-foreground">{reward.description}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
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
              <div className="text-3xl font-bold text-accent">14,750</div>
              <p className="text-xs text-muted-foreground mt-1">
                Obtained from courses and streaks
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in shadow-card" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Longest Streak</CardTitle>
              <TrendingUp className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{user.longestStreak} weeks</div>
              <p className="text-xs text-muted-foreground mt-1">
                Current: {user.streak} weeks
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
                      <h4 className="font-semibold">52 Week Streak</h4>
                      <p className="text-sm text-muted-foreground">Master Learner badge</p>
                    </div>
                    <Badge>52 Weeks</Badge>
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
