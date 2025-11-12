/*
  Warnings:

  - Added the required column `created_by` to the `category_x_budget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pure-finance"."category_x_budget" ADD COLUMN     "created_by" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pure-finance"."category_x_budget" ADD CONSTRAINT "category_x_budget_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
