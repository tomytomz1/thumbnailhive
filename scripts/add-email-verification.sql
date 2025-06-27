-- Migration script to add email verification to existing users table
-- Run this in your Supabase SQL Editor if you already have a users table

-- Add email_verified_at column to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS email_verified_at timestamp without time zone;

-- For existing users who signed up via Google OAuth, mark them as verified
UPDATE public.users 
SET email_verified_at = created_at 
WHERE email_verified_at IS NULL 
  AND avatar_url IS NOT NULL 
  AND avatar_url LIKE '%googleusercontent.com%';

-- Add comment to the column
COMMENT ON COLUMN public.users.email_verified_at IS 'Timestamp when user verified their email address'; 