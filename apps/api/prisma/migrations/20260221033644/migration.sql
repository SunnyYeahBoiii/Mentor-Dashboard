/*
  Warnings:

  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middleName` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "students_count" INTEGER;

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "endTime" TIMESTAMP(3),
ADD COLUMN     "startTime" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "middleName" TEXT NOT NULL;
