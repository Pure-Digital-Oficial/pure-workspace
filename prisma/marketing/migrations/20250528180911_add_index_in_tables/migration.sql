-- AlterTable
ALTER TABLE "pure_marketing"."client" ALTER COLUMN "responsible_name" DROP NOT NULL,
ALTER COLUMN "origin" DROP NOT NULL,
ALTER COLUMN "document" DROP NOT NULL,
ALTER COLUMN "our_code" DROP NOT NULL;

-- AlterTable
ALTER TABLE "pure_marketing"."client_data" ALTER COLUMN "neighborhood" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "acronym" DROP NOT NULL,
ALTER COLUMN "street" DROP NOT NULL,
ALTER COLUMN "number" DROP NOT NULL,
ALTER COLUMN "post_code" DROP NOT NULL;

-- AlterTable
ALTER TABLE "pure_marketing"."contact" ALTER COLUMN "area_code" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "client_responsible_name_idx" ON "pure_marketing"."client"("responsible_name");

-- CreateIndex
CREATE INDEX "client_data_post_code_city_neighborhood_street_idx" ON "pure_marketing"."client_data"("post_code", "city", "neighborhood", "street");

-- CreateIndex
CREATE INDEX "contact_area_code_phone_idx" ON "pure_marketing"."contact"("area_code", "phone");

-- CreateIndex
CREATE INDEX "email_email_idx" ON "pure_marketing"."email"("email");
