-- CreateTable
CREATE TABLE "leaderboard" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "leaderboard_pkey" PRIMARY KEY ("id")
);
