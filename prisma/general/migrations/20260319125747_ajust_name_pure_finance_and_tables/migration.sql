/*
  Warnings:

  - The `frequency_payment` column on the `client` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `frequency` on the `plan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "pure_finance";

-- CreateEnum
CREATE TYPE "pure_general"."Frequency" AS ENUM ('DAILY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "pure_finance"."TransactionType" AS ENUM ('WITHDRAW', 'DEPOSIT');

-- AlterTable
ALTER TABLE "pure_c"."client" DROP COLUMN "frequency_payment",
ADD COLUMN     "frequency_payment" "pure_general"."Frequency";

-- AlterTable
ALTER TABLE "pure_c"."plan" DROP COLUMN "frequency",
ADD COLUMN     "frequency" "pure_general"."Frequency" NOT NULL;

-- CreateTable
CREATE TABLE "pure_finance"."fixed_gain" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "day_of_receipt" INTEGER NOT NULL,
    "frequency" "pure_general"."Frequency" NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "fixed_gain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure_finance"."transaction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "type" "pure_finance"."TransactionType" NOT NULL,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "user_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "initial_date" TIMESTAMP(3),
    "final_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure_finance"."category_transaction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "category_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure_finance"."category_x_budget" (
    "category_id" TEXT NOT NULL,
    "budget_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_x_budget_pkey" PRIMARY KEY ("category_id","budget_id")
);

-- CreateTable
CREATE TABLE "pure_finance"."budget" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "user_id" TEXT NOT NULL,
    "limit_value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "budget_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pure_finance"."fixed_gain" ADD CONSTRAINT "fixed_gain_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_finance"."transaction" ADD CONSTRAINT "transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_finance"."transaction" ADD CONSTRAINT "transaction_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "pure_finance"."category_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_finance"."category_transaction" ADD CONSTRAINT "category_transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_finance"."category_x_budget" ADD CONSTRAINT "category_x_budget_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_finance"."category_x_budget" ADD CONSTRAINT "category_x_budget_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "pure_finance"."category_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_finance"."category_x_budget" ADD CONSTRAINT "category_x_budget_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "pure_finance"."budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_finance"."budget" ADD CONSTRAINT "budget_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
