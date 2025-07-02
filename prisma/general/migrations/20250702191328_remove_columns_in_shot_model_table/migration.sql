/*
  Warnings:

  - You are about to drop the column `created_by` on the `shot_model` table. All the data in the column will be lost.
  - You are about to drop the column `sender` on the `shot_model` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pure_marketing"."shot_model" DROP COLUMN "created_by",
DROP COLUMN "sender";
