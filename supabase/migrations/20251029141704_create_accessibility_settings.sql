/*
  # Accessibility Settings Schema

  1. New Tables
    - `user_accessibility_settings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `language_code` (text) - Selected language code
      - `profile` (text) - Active accessibility profile (motor, blind, dyslexia, cognitive)
      - `oversized_widget` (boolean) - XL widget toggle
      - `smart_contrast` (boolean)
      - `pause_animations` (boolean)
      - `screen_reader` (boolean)
      - `contrast_plus` (boolean)
      - `highlight_links` (boolean)
      - `bigger_text` (boolean)
      - `text_spacing` (boolean)
      - `hide_images` (boolean)
      - `dyslexia_friendly` (boolean)
      - `cursor` (boolean)
      - `tooltips` (boolean)
      - `page_structure` (boolean)
      - `line_height` (boolean)
      - `text_align` (boolean)
      - `dictionary` (boolean)
      - `widget_position` (jsonb) - {x, y} coordinates
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `user_accessibility_settings` table
    - Add policies for authenticated users to manage their own settings
*/

CREATE TABLE IF NOT EXISTS user_accessibility_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  language_code text DEFAULT 'en-US',
  profile text,
  oversized_widget boolean DEFAULT false,
  smart_contrast boolean DEFAULT false,
  pause_animations boolean DEFAULT false,
  screen_reader boolean DEFAULT false,
  contrast_plus boolean DEFAULT false,
  highlight_links boolean DEFAULT false,
  bigger_text boolean DEFAULT false,
  text_spacing boolean DEFAULT false,
  hide_images boolean DEFAULT false,
  dyslexia_friendly boolean DEFAULT false,
  cursor boolean DEFAULT false,
  tooltips boolean DEFAULT false,
  page_structure boolean DEFAULT false,
  line_height boolean DEFAULT false,
  text_align boolean DEFAULT false,
  dictionary boolean DEFAULT false,
  widget_position jsonb DEFAULT '{"x": 20, "y": 20}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE user_accessibility_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own accessibility settings"
  ON user_accessibility_settings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own accessibility settings"
  ON user_accessibility_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own accessibility settings"
  ON user_accessibility_settings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own accessibility settings"
  ON user_accessibility_settings
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_accessibility_settings_user_id 
  ON user_accessibility_settings(user_id);