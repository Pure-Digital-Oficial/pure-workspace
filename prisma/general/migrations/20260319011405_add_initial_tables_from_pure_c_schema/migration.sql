-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "pure_c";

-- CreateEnum
CREATE TYPE "pure_c"."StatusClient" AS ENUM ('PAID', 'STARTED', 'VIEWED', 'TALKED');

-- CreateTable
CREATE TABLE "pure_c"."access_history" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "access_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure_c"."payment_history" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "character_id" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure_c"."plan_x_payment_method" (
    "plan_id" TEXT NOT NULL,
    "payment_method_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plan_x_payment_method_pkey" PRIMARY KEY ("plan_id","payment_method_id")
);

-- CreateTable
CREATE TABLE "pure_c"."payment_plataform_x_payment_method" (
    "plataform_id" TEXT NOT NULL,
    "payment_method_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_plataform_x_payment_method_pkey" PRIMARY KEY ("plataform_id","payment_method_id")
);

-- CreateTable
CREATE TABLE "pure_c"."character_x_plan" (
    "character_id" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "character_x_plan_pkey" PRIMARY KEY ("character_id","plan_id")
);

-- CreateTable
CREATE TABLE "pure_c"."client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "client_status" "pure_c"."StatusClient" NOT NULL DEFAULT 'STARTED',
    "frequency_payment" "pure-finance"."Frequency" NOT NULL,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure_c"."plan" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "frequency" "pure-finance"."Frequency" NOT NULL,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure_c"."character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure_c"."payment_method" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "payment_method_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure_c"."payment_plataform" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "secret_key" TEXT NOT NULL,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "payment_plataform_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_external_id_key" ON "pure_c"."client"("external_id");

-- AddForeignKey
ALTER TABLE "pure_c"."access_history" ADD CONSTRAINT "access_history_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "pure_c"."client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_c"."payment_history" ADD CONSTRAINT "payment_history_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "pure_c"."client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_c"."payment_history" ADD CONSTRAINT "payment_history_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "pure_c"."plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_c"."payment_history" ADD CONSTRAINT "payment_history_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "pure_c"."character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_c"."plan_x_payment_method" ADD CONSTRAINT "plan_x_payment_method_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "pure_c"."plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_c"."plan_x_payment_method" ADD CONSTRAINT "plan_x_payment_method_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "pure_c"."payment_method"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_c"."payment_plataform_x_payment_method" ADD CONSTRAINT "payment_plataform_x_payment_method_plataform_id_fkey" FOREIGN KEY ("plataform_id") REFERENCES "pure_c"."payment_plataform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_c"."payment_plataform_x_payment_method" ADD CONSTRAINT "payment_plataform_x_payment_method_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "pure_c"."payment_method"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_c"."character_x_plan" ADD CONSTRAINT "character_x_plan_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "pure_c"."character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_c"."character_x_plan" ADD CONSTRAINT "character_x_plan_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "pure_c"."plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
