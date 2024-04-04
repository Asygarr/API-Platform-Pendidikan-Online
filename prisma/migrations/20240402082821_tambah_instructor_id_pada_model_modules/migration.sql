/*
  Warnings:

  - Added the required column `instructor_id` to the `Modules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Modules" ADD COLUMN     "instructor_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Modules" ADD CONSTRAINT "Modules_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
