/*
  Warnings:

  - You are about to drop the column `contactEmail` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Organization` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Organization" DROP COLUMN "contactEmail",
DROP COLUMN "phone";
