-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "pure_marketing";

-- CreateEnum
CREATE TYPE "pure_marketing"."status" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED', 'UNDER_ANALYSIS');

-- CreateEnum
CREATE TYPE "pure_marketing"."contact_type" AS ENUM ('PHONE', 'FIXED', 'SOCIAL_MEDIA', 'FIXED_NO_DDD', 'PHONE_NO_DDD');

-- CreateEnum
CREATE TYPE "pure_marketing"."user_type" AS ENUM ('NO_DOCUMENT', 'DOCUMENT');

-- CreateTable
CREATE TABLE "pure_marketing"."client" (
    "id" TEXT NOT NULL,
    "responsible_name" TEXT NOT NULL,
    "type" "pure_marketing"."user_type" NOT NULL DEFAULT 'NO_DOCUMENT',
    "origin" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "our_code" TEXT NOT NULL,
    "status" "pure_marketing"."status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure_marketing"."client_data" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "acronym" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "post_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "client_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure_marketing"."email" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "variant" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "status" "pure_marketing"."status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure_marketing"."contact" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "variant" TEXT NOT NULL,
    "type" "pure_marketing"."contact_type" NOT NULL,
    "area_code" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" "pure_marketing"."status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure_marketing"."target" (
    "client_id" TEXT NOT NULL,
    "lot_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "target_pkey" PRIMARY KEY ("client_id","lot_id")
);

-- CreateTable
CREATE TABLE "pure_marketing"."shot" (
    "id" TEXT NOT NULL,
    "model_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "scheduled" BOOLEAN NOT NULL,
    "schedule_date" TIMESTAMP(3),
    "status" "pure_marketing"."status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "shot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure_marketing"."shot_model" (
    "id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "status" "pure_marketing"."status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "shot_model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure_marketing"."lot" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "lot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure_marketing"."shot_x_lot" (
    "lot_id" TEXT NOT NULL,
    "shot_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "shot_x_lot_pkey" PRIMARY KEY ("shot_id","lot_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_data_client_id_key" ON "pure_marketing"."client_data"("client_id");

-- AddForeignKey
ALTER TABLE "pure_marketing"."client_data" ADD CONSTRAINT "client_data_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "pure_marketing"."client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_marketing"."email" ADD CONSTRAINT "email_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "pure_marketing"."client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_marketing"."contact" ADD CONSTRAINT "contact_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "pure_marketing"."client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_marketing"."target" ADD CONSTRAINT "target_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "pure_marketing"."client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_marketing"."target" ADD CONSTRAINT "target_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "pure_marketing"."lot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_marketing"."shot" ADD CONSTRAINT "shot_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "pure_marketing"."shot_model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
