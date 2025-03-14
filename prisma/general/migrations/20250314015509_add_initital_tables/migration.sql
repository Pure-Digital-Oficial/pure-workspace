-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "pure_general";

-- CreateEnum
CREATE TYPE "pure_general"."Status" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED', 'PENDING');

-- CreateEnum
CREATE TYPE "pure_general"."AuthType" AS ENUM ('GOOGLE', 'DEFAULT');

-- CreateEnum
CREATE TYPE "pure_general"."UserType" AS ENUM ('DEFAULT', 'DEFAULT_ADMIN', 'ADMIN');

-- CreateTable
CREATE TABLE "pure_general"."application" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure_general"."application_x_user" (
    "app_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "application_x_user_pkey" PRIMARY KEY ("user_id","app_id")
);

-- CreateTable
CREATE TABLE "pure_general"."auth" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "access_token" TEXT,
    "type" "pure_general"."AuthType" NOT NULL DEFAULT 'DEFAULT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure_general"."user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'PENDING',
    "type" "pure_general"."UserType" NOT NULL DEFAULT 'DEFAULT',
    "picture" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure_general"."confirm_delete_user" (
    "id" TEXT NOT NULL,
    "responsibly_user" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "confirm_delete_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure_general"."user_data" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure_general"."contact_x_user" (
    "contact_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_x_user_pkey" PRIMARY KEY ("user_id","contact_id")
);

-- CreateTable
CREATE TABLE "pure_general"."contact" (
    "id" TEXT NOT NULL,
    "area_code" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_user_id_key" ON "pure_general"."auth"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_data_user_id_key" ON "pure_general"."user_data"("user_id");

-- AddForeignKey
ALTER TABLE "pure_general"."application_x_user" ADD CONSTRAINT "application_x_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_general"."application_x_user" ADD CONSTRAINT "application_x_user_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "pure_general"."application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_general"."auth" ADD CONSTRAINT "auth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_general"."confirm_delete_user" ADD CONSTRAINT "confirm_delete_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_general"."user_data" ADD CONSTRAINT "user_data_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_general"."contact_x_user" ADD CONSTRAINT "contact_x_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_general"."contact_x_user" ADD CONSTRAINT "contact_x_user_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "pure_general"."contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
