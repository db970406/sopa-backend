-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "skills" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 0;
