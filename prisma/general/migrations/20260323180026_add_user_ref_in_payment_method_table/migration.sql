/*
  Warnings:

  - Added the required column `user_id` to the `payment_method` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pure_c"."payment_method" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pure_c"."payment_method" ADD CONSTRAINT "payment_method_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
