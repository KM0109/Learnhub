/*
  # Create video progress tracking table

  1. New Tables
    - `video_progress`
      - `id` (uuid, primary key) - Unique identifier for each progress record
      - `user_id` (uuid) - Reference to the user watching the video
      - `course_id` (text) - The course this video belongs to
      - `lesson_id` (text) - The specific lesson/video being watched
      - `watched_seconds` (numeric) - Number of seconds watched
      - `total_duration` (numeric) - Total duration of the video in seconds
      - `is_completed` (boolean) - Whether the video has been completed (watched 90%+)
      - `last_watched_at` (timestamptz) - When the user last watched this video
      - `created_at` (timestamptz) - When the record was first created
      - `updated_at` (timestamptz) - When the record was last updated

  2. Security
    - Enable RLS on `video_progress` table
    - Add policy for authenticated users to read their own progress
    - Add policy for authenticated users to insert their own progress
    - Add policy for authenticated users to update their own progress
    
  3. Indexes
    - Create index on user_id and course_id for faster queries
    - Create unique index on user_id, course_id, and lesson_id combination

  4. Important Notes
    - Progress is tracked per user, per course, per lesson
    - Users can only access their own progress data
    - The is_completed flag is set when watched_seconds reaches 90% of total_duration
    - Timestamps are automatically managed
*/

CREATE TABLE IF NOT EXISTS video_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  course_id text NOT NULL,
  lesson_id text NOT NULL,
  watched_seconds numeric DEFAULT 0,
  total_duration numeric NOT NULL,
  is_completed boolean DEFAULT false,
  last_watched_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE video_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own video progress"
  ON video_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own video progress"
  ON video_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own video progress"
  ON video_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own video progress"
  ON video_progress
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_video_progress_user_course 
  ON video_progress(user_id, course_id);

CREATE UNIQUE INDEX IF NOT EXISTS idx_video_progress_unique 
  ON video_progress(user_id, course_id, lesson_id);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_video_progress_updated_at
  BEFORE UPDATE ON video_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
