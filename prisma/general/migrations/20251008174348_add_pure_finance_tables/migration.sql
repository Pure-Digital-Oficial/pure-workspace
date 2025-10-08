-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "pure-finance";

-- CreateEnum
CREATE TYPE "pure-finance"."Frequency" AS ENUM ('DAILY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "pure-finance"."TransactionType" AS ENUM ('WITHDRAW', 'DEPOSIT');

-- CreateTable
CREATE TABLE "pure-finance"."fixed_earning" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "day_of_receipt" INTEGER NOT NULL,
    "frequency" "pure-finance"."Frequency" NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fixed_earning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure-finance"."transacion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "type" "pure-finance"."TransactionType" NOT NULL,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "user_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "initial_date" TIMESTAMP(3),
    "final_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure-finance"."category_transaction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure-finance"."category_x_budget" (
    "category_id" TEXT NOT NULL,
    "budget_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_x_budget_pkey" PRIMARY KEY ("category_id","budget_id")
);

-- CreateTable
CREATE TABLE "pure-finance"."budget" (
    "id" TEXT NOT NULL,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "user_id" TEXT NOT NULL,
    "limit_value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "budget_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pure-finance"."fixed_earning" ADD CONSTRAINT "fixed_earning_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure-finance"."transacion" ADD CONSTRAINT "transacion_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "pure-finance"."category_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure-finance"."category_transaction" ADD CONSTRAINT "category_transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure-finance"."category_x_budget" ADD CONSTRAINT "category_x_budget_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "pure-finance"."category_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure-finance"."category_x_budget" ADD CONSTRAINT "category_x_budget_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "pure-finance"."budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure-finance"."budget" ADD CONSTRAINT "budget_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
