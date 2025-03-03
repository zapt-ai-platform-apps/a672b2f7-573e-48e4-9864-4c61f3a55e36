CREATE TABLE IF NOT EXISTS "squads" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "squad_players" (
  "id" SERIAL PRIMARY KEY,
  "squad_id" INTEGER NOT NULL REFERENCES "squads" ("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW()
);