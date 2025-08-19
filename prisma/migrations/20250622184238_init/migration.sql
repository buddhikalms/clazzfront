/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Teacher_slug_idx` ON `teacher`;

-- CreateIndex
CREATE UNIQUE INDEX `Teacher_slug_key` ON `Teacher`(`slug`);
