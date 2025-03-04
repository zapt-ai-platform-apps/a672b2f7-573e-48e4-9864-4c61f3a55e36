-- Migrate from serial integer IDs to UUIDs
DROP TABLE IF EXISTS "squad_players";
DROP TABLE IF EXISTS "squads";

CREATE TABLE IF NOT EXISTS "squads" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "squad_players" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "squad_id" UUID NOT NULL REFERENCES "squads" ("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW()
);