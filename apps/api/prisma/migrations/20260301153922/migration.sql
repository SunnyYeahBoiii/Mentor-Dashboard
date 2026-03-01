/*
  Warnings:

  - You are about to drop the column `meettingLink` on the `RunningSection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RunningSection" DROP COLUMN "meettingLink",
ADD COLUMN     "meetingLink" TEXT;
