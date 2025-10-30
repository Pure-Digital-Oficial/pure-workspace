-- AlterTable
ALTER TABLE "pure-finance"."budget" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "pure-finance"."category_transaction" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "pure-finance"."fixed_earning" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "pure-finance"."transaction" ADD COLUMN     "deleted_at" TIMESTAMP(3);
