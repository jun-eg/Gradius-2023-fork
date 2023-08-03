/*
  Warnings:

  - You are about to drop the column `board` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `x` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `y` on the `game` table. All the data in the column will be lost.
  - Added the required column `position` to the `game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "game" DROP COLUMN "board",
DROP COLUMN "x",
DROP COLUMN "y",
ADD COLUMN     "position" JSONB NOT NULL;
