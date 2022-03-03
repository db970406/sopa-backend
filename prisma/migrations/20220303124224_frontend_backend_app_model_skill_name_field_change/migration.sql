/*
  Warnings:

  - You are about to drop the column `skill` on the `App` table. All the data in the column will be lost.
  - You are about to drop the column `skill` on the `Backend` table. All the data in the column will be lost.
  - You are about to drop the column `skill` on the `Frontend` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `App` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Backend` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Frontend` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Backend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Frontend` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "App_skill_key";

-- DropIndex
DROP INDEX "Backend_skill_key";

-- DropIndex
DROP INDEX "Frontend_skill_key";

-- AlterTable
ALTER TABLE "App" DROP COLUMN "skill",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Backend" DROP COLUMN "skill",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Frontend" DROP COLUMN "skill",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "App_name_key" ON "App"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Backend_name_key" ON "Backend"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Frontend_name_key" ON "Frontend"("name");
