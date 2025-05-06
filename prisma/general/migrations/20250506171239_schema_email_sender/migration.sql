-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "email_sender";

-- CreateTable
CREATE TABLE "email_sender"."email_template" (
    "id" TEXT NOT NULL,
    "created_by_id" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "attachments" TEXT NOT NULL,

    CONSTRAINT "email_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_sender"."shot" (
    "id" TEXT NOT NULL,
    "created_by_id" TEXT NOT NULL,
    "email_template_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "scheduled" BOOLEAN NOT NULL,
    "scheduled_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "shot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_sender"."email_lot" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "email_lot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_sender"."email_lot_x_shot" (
    "email_lot_id" TEXT NOT NULL,
    "shot_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_lot_x_shot_pkey" PRIMARY KEY ("email_lot_id","shot_id")
);

-- CreateTable
CREATE TABLE "email_sender"."target_email" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lot_id" TEXT NOT NULL,

    CONSTRAINT "target_email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_sender"."shot_fired" (
    "id" TEXT NOT NULL,
    "shot_id" TEXT NOT NULL,
    "target_email_id" TEXT NOT NULL,
    "status" "pure_general"."Status" NOT NULL DEFAULT 'ACTIVE',
    "error" TEXT,
    "sent_at" TIMESTAMP(3),
    "opened_at" TIMESTAMP(3),
    "clicked_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shot_fired_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "email_sender"."email_template" ADD CONSTRAINT "email_template_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_sender"."email_template" ADD CONSTRAINT "email_template_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_sender"."shot" ADD CONSTRAINT "shot_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "pure_general"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_sender"."shot" ADD CONSTRAINT "shot_email_template_id_fkey" FOREIGN KEY ("email_template_id") REFERENCES "email_sender"."email_template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_sender"."email_lot_x_shot" ADD CONSTRAINT "email_lot_x_shot_email_lot_id_fkey" FOREIGN KEY ("email_lot_id") REFERENCES "email_sender"."email_lot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_sender"."email_lot_x_shot" ADD CONSTRAINT "email_lot_x_shot_shot_id_fkey" FOREIGN KEY ("shot_id") REFERENCES "email_sender"."shot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_sender"."target_email" ADD CONSTRAINT "target_email_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "email_sender"."email_lot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_sender"."shot_fired" ADD CONSTRAINT "shot_fired_shot_id_fkey" FOREIGN KEY ("shot_id") REFERENCES "email_sender"."shot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_sender"."shot_fired" ADD CONSTRAINT "shot_fired_target_email_id_fkey" FOREIGN KEY ("target_email_id") REFERENCES "email_sender"."target_email"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
