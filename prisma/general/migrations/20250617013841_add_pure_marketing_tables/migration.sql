-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "pure_marketing";

-- CreateTable
CREATE TABLE "pure_marketing"."trigger" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trigger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure_marketing"."target_reference" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "trigger_id" TEXT NOT NULL,
    "local_id" TEXT NOT NULL,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "target_reference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pure_marketing"."shot" (
    "id" TEXT NOT NULL,
    "model_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "scheduled" BOOLEAN NOT NULL,
    "schedule_date" TIMESTAMP(3),
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
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
    "user_id" TEXT NOT NULL,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "shot_model_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pure_marketing"."trigger" ADD CONSTRAINT "trigger_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_marketing"."target_reference" ADD CONSTRAINT "target_reference_trigger_id_fkey" FOREIGN KEY ("trigger_id") REFERENCES "pure_marketing"."trigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_marketing"."shot" ADD CONSTRAINT "shot_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "pure_marketing"."shot_model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_marketing"."shot_model" ADD CONSTRAINT "shot_model_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
