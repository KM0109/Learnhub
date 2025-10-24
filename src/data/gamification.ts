import { Badge, Milestone, UserProfile } from "@/types/user";

export const mockBadges: Badge[] = [
  {
    id: "1",
    name: "First Step",
    description: "Complete your first lesson",
    icon: "🎯",
    earned: true,
    earnedDate: "2024-01-15",
    rarity: "common"
  },
  {
    id: "2",
    name: "Fast Learner",
    description: "Complete 5 lessons in one day",
    icon: "⚡",
    earned: true,
    earnedDate: "2024-01-20",
    rarity: "rare"
  },
  {
    id: "3",
    name: "Week Warrior",
    description: "Maintain a weekly learning streak",
    icon: "🔥",
    earned: true,
    earnedDate: "2024-02-01",
    rarity: "rare"
  },
  {
    id: "4",
    name: "Course Conqueror",
    description: "Complete your first course",
    icon: "🏆",
    earned: true,
    earnedDate: "2024-02-10",
    rarity: "epic"
  },
  {
    id: "5",
    name: "Knowledge Seeker",
    description: "Enroll in 5 different courses",
    icon: "📚",
    earned: false,
    rarity: "rare"
  },
  {
    id: "6",
    name: "Perfect Score",
    description: "Get 100% on a quiz",
    icon: "💯",
    earned: true,
    earnedDate: "2024-01-25",
    rarity: "epic"
  },
  {
    id: "7",
    name: "Master Mind",
    description: "Reach level 10",
    icon: "🧠",
    earned: false,
    rarity: "legendary"
  },
  {
    id: "8",
    name: "Marathon Learner",
    description: "Study for 50 hours total",
    icon: "🎓",
    earned: false,
    rarity: "epic"
  },
];

export const mockMilestones: Milestone[] = [
  {
    id: "1",
    title: "Complete 10 Lessons",
    description: "Finish 10 lessons across any courses",
    progress: 10,
    target: 10,
    reward: "+500 XP",
    completed: true
  },
  {
    id: "2",
    title: "12 Week Streak",
    description: "Learn something every week for 12 weeks",
    progress: 3,
    target: 12,
    reward: "Legendary Badge",
    completed: false
  },
  {
    id: "3",
    title: "Complete 3 Courses",
    description: "Finish 3 complete courses",
    progress: 1,
    target: 3,
    reward: "+1000 XP",
    completed: false
  },
  {
    id: "4",
    title: "Earn 5 Badges",
    description: "Unlock 5 achievement badges",
    progress: 5,
    target: 5,
    reward: "Special Avatar Frame",
    completed: true
  },
];

export const mockUserProfile: UserProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  level: 7,
  xp: 2850,
  xpToNextLevel: 3500,
  totalXp: 15420,
  streak: 3,
  longestStreak: 8,
  coursesCompleted: 3,
  hoursLearned: 47,
  badges: mockBadges,
  milestones: mockMilestones,
  joinedDate: "2024-01-10"
};
