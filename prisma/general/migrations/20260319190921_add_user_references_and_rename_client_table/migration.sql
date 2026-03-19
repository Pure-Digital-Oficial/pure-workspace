/*
  Warnings:

  - You are about to drop the column `client_id` on the `access_history` table. All the data in the column will be lost.
  - You are about to drop the column `client_id` on the `payment_history` table. All the data in the column will be lost.
  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customer_id` to the `access_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `payment_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `plan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "pure_c"."StatusCustomer" AS ENUM ('PAID', 'STARTED', 'VIEWED', 'TALKED');

-- DropForeignKey
ALTER TABLE "pure_c"."access_history" DROP CONSTRAINT "access_history_client_id_fkey";

-- DropForeignKey
ALTER TABLE "pure_c"."payment_history" DROP CONSTRAINT "payment_history_client_id_fkey";

-- AlterTable
ALTER TABLE "pure_c"."access_history" DROP COLUMN "client_id",
ADD COLUMN     "customer_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pure_c"."character" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pure_c"."payment_history" DROP COLUMN "client_id",
ADD COLUMN     "customer_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pure_c"."plan" ADD COLUMN     "user_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "pure_c"."client";

-- DropEnum
DROP TYPE "pure_c"."StatusClient";

-- CreateTable
CREATE TABLE "pure_c"."customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "customer_status" "pure_c"."StatusCustomer" NOT NULL DEFAULT 'STARTED',
    "frequency_payment" "pure_general"."Frequency",
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_external_id_key" ON "pure_c"."customer"("external_id");

-- AddForeignKey
ALTER TABLE "pure_c"."access_history" ADD CONSTRAINT "access_history_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "pure_c"."customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_c"."payment_history" ADD CONSTRAINT "payment_history_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "pure_c"."customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_c"."customer" ADD CONSTRAINT "customer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_c"."plan" ADD CONSTRAINT "plan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_c"."character" ADD CONSTRAINT "character_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
