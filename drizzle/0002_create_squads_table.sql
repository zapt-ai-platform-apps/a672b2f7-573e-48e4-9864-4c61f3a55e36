CREATE TABLE IF NOT EXISTS "squads" (
  "id" SERIAL PRIMARY KEY,
  "user_id" UUID NOT NULL,
  "name" TEXT NOT NULL,
  "players" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW()
);