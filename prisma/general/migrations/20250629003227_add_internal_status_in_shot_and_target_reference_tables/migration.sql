-- CreateEnum
CREATE TYPE "pure_marketing"."InternalStatus" AS ENUM ('ERROR', 'ON_HOLD', 'PROCESSING', 'SCHEDULED', 'COMPLETE');

-- AlterTable
ALTER TABLE "pure_marketing"."shot" ADD COLUMN     "internal_status" "pure_marketing"."InternalStatus" NOT NULL DEFAULT 'ON_HOLD';

-- AlterTable
ALTER TABLE "pure_marketing"."target_reference" ADD COLUMN     "internal_status" "pure_marketing"."InternalStatus" NOT NULL DEFAULT 'ON_HOLD';
