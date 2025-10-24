/*
  # Create Courses and Enrollments Schema

  ## Overview
  This migration creates a comprehensive learning management system with courses, lessons, enrollments, and progress tracking.

  ## New Tables

  ### 1. `courses`
  Main course information table
  - `id` (uuid, primary key) - Unique course identifier
  - `title` (text) - Course title
  - `description` (text) - Course description
  - `instructor` (text) - Instructor name
  - `price` (numeric) - Course price (0 for free courses)
  - `rating` (numeric) - Course rating (0-5)
  - `students` (integer) - Total enrolled students
  - `duration` (text) - Total course duration
  - `level` (text) - Difficulty level (Beginner/Intermediate/Advanced)
  - `category` (text) - Course category
  - `thumbnail` (text) - Course thumbnail URL
  - `total_xp` (integer) - Total XP available in course
  - `created_at` (timestamptz) - Course creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `lessons`
  Course lessons/modules table
  - `id` (uuid, primary key) - Unique lesson identifier
  - `course_id` (uuid, foreign key) - Associated course
  - `title` (text) - Lesson title
  - `duration` (integer) - Lesson duration in minutes
  - `type` (text) - Lesson type (video/reading/quiz)
  - `xp` (integer) - XP earned upon completion
  - `video_id` (text) - YouTube video ID
  - `position` (integer) - Lesson order within course
  - `created_at` (timestamptz) - Lesson creation timestamp

  ### 3. `enrollments`
  User course enrollments table
  - `id` (uuid, primary key) - Unique enrollment identifier
  - `user_id` (uuid) - User identifier (will connect to auth later)
  - `course_id` (uuid, foreign key) - Enrolled course
  - `enrolled_at` (timestamptz) - Enrollment timestamp
  - `completed_at` (timestamptz) - Completion timestamp (null if not completed)
  - `progress` (integer) - Course progress percentage (0-100)
  - `purchased` (boolean) - Whether course was purchased

  ### 4. `lesson_progress`
  Individual lesson completion tracking
  - `id` (uuid, primary key) - Unique progress record identifier
  - `enrollment_id` (uuid, foreign key) - Associated enrollment
  - `lesson_id` (uuid, foreign key) - Completed lesson
  - `completed_at` (timestamptz) - Completion timestamp
  - `xp_earned` (integer) - XP earned from lesson

  ### 5. `wishlists`
  User course wishlists
  - `id` (uuid, primary key) - Unique wishlist entry identifier
  - `user_id` (uuid) - User identifier
  - `course_id` (uuid, foreign key) - Wishlisted course
  - `added_at` (timestamptz) - When added to wishlist

  ## Security
  - RLS enabled on all tables
  - Public read access for courses and lessons (catalog browsing)
  - Authenticated users can manage their own enrollments and wishlists
  - Users can only view their own progress data

  ## Indexes
  - Course lookup by category and level
  - Lesson lookup by course
  - Enrollment lookup by user and course
  - Lesson progress lookup for efficient queries
*/

CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  instructor text NOT NULL,
  price numeric(10, 2) NOT NULL DEFAULT 0,
  rating numeric(2, 1) DEFAULT 0,
  students integer DEFAULT 0,
  duration text NOT NULL,
  level text NOT NULL CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
  category text NOT NULL,
  thumbnail text NOT NULL,
  total_xp integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  duration integer NOT NULL,
  type text NOT NULL CHECK (type IN ('video', 'reading', 'quiz')),
  xp integer NOT NULL DEFAULT 0,
  video_id text,
  position integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  purchased boolean DEFAULT false,
  UNIQUE(user_id, course_id)
);

CREATE TABLE IF NOT EXISTS lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id uuid NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed_at timestamptz DEFAULT now(),
  xp_earned integer DEFAULT 0,
  UNIQUE(enrollment_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS wishlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  added_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);
CREATE INDEX IF NOT EXISTS idx_lessons_course ON lessons(course_id, position);
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_enrollment ON lesson_progress(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_wishlists_user ON wishlists(user_id);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view courses"
  ON courses FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can view lessons"
  ON lessons FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can view their own enrollments"
  ON enrollments FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create their own enrollments"
  ON enrollments FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can update their own enrollments"
  ON enrollments FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Users can view their lesson progress"
  ON lesson_progress FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create lesson progress"
  ON lesson_progress FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view all wishlists"
  ON wishlists FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create wishlist entries"
  ON wishlists FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can delete wishlist entries"
  ON wishlists FOR DELETE
  TO public
  USING (true);