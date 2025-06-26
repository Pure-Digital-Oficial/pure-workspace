/*
  Warnings:

  - Added the required column `type` to the `trigger` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "pure_marketing"."TriggerType" AS ENUM ('EMAIL', 'PHONE');

-- AlterTable
ALTER TABLE "pure_marketing"."trigger" ADD COLUMN     "type" "pure_marketing"."TriggerType" NOT NULL;
