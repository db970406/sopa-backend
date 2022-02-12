/*
  Warnings:

  - You are about to drop the column `appId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `backendId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `frontendId` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "appId",
DROP COLUMN "backendId",
DROP COLUMN "frontendId";
