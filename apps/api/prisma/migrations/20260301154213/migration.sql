/*
  Warnings:

  - Added the required column `className` to the `RunningSection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RunningSection" ADD COLUMN     "className" TEXT NOT NULL;
