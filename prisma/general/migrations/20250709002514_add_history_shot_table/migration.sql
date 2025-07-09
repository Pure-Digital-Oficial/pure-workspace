-- CreateTable
CREATE TABLE "pure_marketing"."history_shot" (
    "id" TEXT NOT NULL,
    "error" TEXT,
    "target_id" TEXT NOT NULL,
    "shot_id" TEXT NOT NULL,
    "oppened" BOOLEAN NOT NULL DEFAULT false,
    "clicked_in_link" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "clicked_at" TIMESTAMP(3),
    "oppened_at" TIMESTAMP(3),
    "shoted_at" TIMESTAMP(3),
    "status" "pure_marketing"."InternalStatus" NOT NULL DEFAULT 'PROCESSING',

    CONSTRAINT "history_shot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pure_marketing"."history_shot" ADD CONSTRAINT "history_shot_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "pure_marketing"."target_reference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pure_marketing"."history_shot" ADD CONSTRAINT "history_shot_shot_id_fkey" FOREIGN KEY ("shot_id") REFERENCES "pure_marketing"."shot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
