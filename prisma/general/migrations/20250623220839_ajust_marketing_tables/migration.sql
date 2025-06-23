/*
  Warnings:

  - Added the required column `user_id` to the `shot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pure_marketing"."shot" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pure_marketing"."shot_model" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "pure_marketing"."trigger" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "pure_marketing"."shot" ADD CONSTRAINT "shot_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
