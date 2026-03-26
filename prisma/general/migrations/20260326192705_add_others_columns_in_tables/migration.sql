/*
  Warnings:

  - Added the required column `external_id` to the `payment_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `payment_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `payment_method` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `payment_plataform` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pure_c"."payment_history" ADD COLUMN     "external_id" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "pure_general"."Status" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pure_c"."payment_method" ADD COLUMN     "value" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pure_c"."payment_plataform" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pure_c"."payment_history" ADD CONSTRAINT "payment_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_c"."payment_plataform" ADD CONSTRAINT "payment_plataform_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
