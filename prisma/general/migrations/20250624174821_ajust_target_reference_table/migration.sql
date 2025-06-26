/*
  Warnings:

  - Added the required column `user_id` to the `target_reference` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pure_marketing"."target_reference" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "local_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "pure_marketing"."target_reference" ADD CONSTRAINT "target_reference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
