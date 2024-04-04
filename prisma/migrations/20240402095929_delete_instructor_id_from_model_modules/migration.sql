/*
  Warnings:

  - You are about to drop the column `instructor_id` on the `Modules` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Modules" DROP CONSTRAINT "Modules_instructor_id_fkey";

-- AlterTable
ALTER TABLE "Modules" DROP COLUMN "instructor_id";
