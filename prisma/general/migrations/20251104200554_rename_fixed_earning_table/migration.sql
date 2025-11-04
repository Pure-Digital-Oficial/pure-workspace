/*
  Warnings:

  - You are about to drop the `fixed_earning` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pure-finance"."fixed_earning" DROP CONSTRAINT "fixed_earning_user_id_fkey";

-- DropTable
DROP TABLE "pure-finance"."fixed_earning";

-- CreateTable
CREATE TABLE "pure-finance"."fixed_gain" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "day_of_receipt" INTEGER NOT NULL,
    "frequency" "pure-finance"."Frequency" NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "fixed_gain_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pure-finance"."fixed_gain" ADD CONSTRAINT "fixed_gain_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
