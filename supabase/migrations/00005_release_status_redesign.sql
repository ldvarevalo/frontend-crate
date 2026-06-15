-- Migration: Release status redesign — add is_listened, alter enum
-- Apply via Supabase Dashboard → SQL Editor

-- Step 1: Add is_listened columns

ALTER TABLE user_releases
  ADD COLUMN is_listened BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN listened_at TIMESTAMPTZ;

-- Step 2: Migrate existing 'listened' rows to 'owned' + is_listened

UPDATE user_releases ur
SET
  status = 'owned',
  is_listened = EXISTS (
    SELECT 1 FROM listening_sessions ls
    WHERE ls.user_release_id = ur.id
  ),
  listened_at = (
    SELECT MAX(ls.listened_at) FROM listening_sessions ls
    WHERE ls.user_release_id = ur.id
  )
WHERE ur.status = 'listened';

-- Step 3: Alter the enum — remove 'listened', add 'discover'

ALTER TYPE release_status RENAME TO release_status_old;

CREATE TYPE release_status AS ENUM ('discover', 'want', 'owned');

ALTER TABLE user_releases
  ALTER COLUMN status DROP DEFAULT,
  ALTER COLUMN status TYPE release_status
  USING (
    CASE
      WHEN status = 'listened' THEN 'owned'::text
      ELSE status::text
    END
  )::release_status,
  ALTER COLUMN status SET DEFAULT 'want';

DROP TYPE release_status_old;
