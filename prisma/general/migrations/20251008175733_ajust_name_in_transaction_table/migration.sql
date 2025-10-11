/*
  Warnings:

  - You are about to drop the `transacion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pure-finance"."transacion" DROP CONSTRAINT "transacion_category_id_fkey";

-- DropTable
DROP TABLE "pure-finance"."transacion";

-- CreateTable
CREATE TABLE "pure-finance"."transaction" (
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

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pure-finance"."transaction" ADD CONSTRAINT "transaction_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "pure-finance"."category_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
