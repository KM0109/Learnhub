export interface UserLevel {
  level: number;
  name: string;
  minXP: number;
  maxXP: number;
  color: string;
  icon: string;
  rewards: LevelReward[];
}

export interface LevelReward {
  id: string;
  type: 'coupon' | 'badge' | 'feature';
  title: string;
  description: string;
  value?: string;
  code?: string;
}

export const levels: UserLevel[] = [
  {
    level: 1,
    name: "",
    minXP: 0,
    maxXP: 999,
    color: "bg-slate-500",
    icon: "📘",
    rewards: [
      {
        id: "welcome-badge",
        type: "badge",
        title: "Welcome Badge",
        description: "Your first step into learning!"
      }
    ]
  },
  {
    level: 2,
    name: "",
    minXP: 1000,
    maxXP: 2499,
    color: "bg-blue-500",
    icon: "📚",
    rewards: [
      {
        id: "seeker-coupon",
        type: "coupon",
        title: "10% Off Coupon",
        description: "10% discount on any course",
        value: "10%",
        code: "SEEKER10"
      },
      {
        id: "seeker-badge",
        type: "badge",
        title: "Knowledge Seeker Badge",
        description: "Awarded for reaching Level 2"
      }
    ]
  },
  {
    level: 3,
    name: "",
    minXP: 2500,
    maxXP: 4999,
    color: "bg-green-500",
    icon: "💡",
    rewards: [
      {
        id: "skilled-coupon",
        type: "coupon",
        title: "15% Off Coupon",
        description: "15% discount on any course",
        value: "15%",
        code: "SKILLED15"
      },
      {
        id: "priority-support",
        type: "feature",
        title: "Priority Support Access",
        description: "Get faster response times from support"
      }
    ]
  },
  {
    level: 4,
    name: "",
    minXP: 5000,
    maxXP: 9999,
    color: "bg-yellow-500",
    icon: "⭐",
    rewards: [
      {
        id: "master-coupon",
        type: "coupon",
        title: "20% Off Coupon",
        description: "20% discount on any course",
        value: "20%",
        code: "MASTER20"
      },
      {
        id: "early-access",
        type: "feature",
        title: "Early Access to New Courses",
        description: "Be the first to access newly released courses"
      }
    ]
  },
  {
    level: 5,
    name: "",
    minXP: 10000,
    maxXP: 19999,
    color: "bg-orange-500",
    icon: "🏆",
    rewards: [
      {
        id: "expert-coupon",
        type: "coupon",
        title: "25% Off Coupon",
        description: "25% discount on your next course purchase",
        value: "25%",
        code: "LEARNHUB25"
      },
      {
        id: "exclusive-newsletter",
        type: "feature",
        title: "Weekly Educational Newsletter",
        description: "Receive exclusive weekly newsletters with learning tips, industry insights, and curated educational content"
      },
      {
        id: "exclusive-blog",
        type: "feature",
        title: "Premium Blog Access",
        description: "Access to members-only blog posts covering advanced topics and real-world case studies"
      }
    ]
  },
  {
    level: 6,
    name: "",
    minXP: 20000,
    maxXP: 29999,
    color: "bg-red-500",
    icon: "👑",
    rewards: [
      {
        id: "grandmaster-coupon",
        type: "coupon",
        title: "30% Off Coupon",
        description: "30% discount on any course",
        value: "30%",
        code: "GRANDMASTER30"
      },
      {
        id: "lifetime-access",
        type: "feature",
        title: "VIP Lifetime Access",
        description: "Lifetime access to all future courses and materials"
      },
      {
        id: "mentorship",
        type: "feature",
        title: "Personal Mentorship Session",
        description: "One-on-one session with an industry expert"
      }
    ]
  },
  {
    level: 7,
    name: "",
    minXP: 30000,
    maxXP: 44999,
    color: "bg-blue-600",
    icon: "💎",
    rewards: [
      {
        id: "elite-coupon",
        type: "coupon",
        title: "35% Off Coupon",
        description: "35% discount on any course",
        value: "35%",
        code: "ELITE35"
      },
      {
        id: "priority-review",
        type: "feature",
        title: "Priority Code Review",
        description: "Get your projects reviewed by expert instructors"
      }
    ]
  },
  {
    level: 8,
    name: "",
    minXP: 45000,
    maxXP: Infinity,
    color: "bg-gradient-to-r from-yellow-500 to-orange-500",
    icon: "🌟",
    rewards: [
      {
        id: "sage-coupon",
        type: "coupon",
        title: "40% Off Coupon",
        description: "40% discount on any course",
        value: "40%",
        code: "SAGE40"
      }
    ]
  }
];

export const getUserLevel = (totalXP: number): UserLevel => {
  return levels.find(level => totalXP >= level.minXP && totalXP <= level.maxXP) || levels[0];
};

export const getProgressToNextLevel = (totalXP: number): { current: UserLevel; next: UserLevel | null; progress: number } => {
  const currentLevel = getUserLevel(totalXP);
  const currentLevelIndex = levels.findIndex(l => l.level === currentLevel.level);
  const nextLevel = currentLevelIndex < levels.length - 1 ? levels[currentLevelIndex + 1] : null;

  if (!nextLevel) {
    return { current: currentLevel, next: null, progress: 100 };
  }

  const xpInCurrentLevel = totalXP - currentLevel.minXP;
  const xpNeededForNextLevel = nextLevel.minXP - currentLevel.minXP;
  const progress = (xpInCurrentLevel / xpNeededForNextLevel) * 100;

  return { current: currentLevel, next: nextLevel, progress: Math.min(progress, 100) };
};

export const getTotalXPFromCourses = (courses: any[]): number => {
  return courses.reduce((total, course) => {
    if (course.enrolled || course.purchased) {
      const completedLessons = course.lessons.filter((lesson: any) => lesson.completed);
      const xp = completedLessons.reduce((sum: number, lesson: any) => sum + lesson.xp, 0);
      return total + xp;
    }
    return total;
  }, 0);
};
