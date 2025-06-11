/*
  Warnings:

  - You are about to drop the column `facebook_url` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `instagram_url` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `site_url` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `tiktok_url` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `twitter_url` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "facebook_url",
DROP COLUMN "instagram_url",
DROP COLUMN "site_url",
DROP COLUMN "tiktok_url",
DROP COLUMN "twitter_url";

-- CreateTable
CREATE TABLE "ticket_types" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ticket_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_modalities" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ticket_modalities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_offers" (
    "id" TEXT NOT NULL,
    "ticket_type_id" TEXT NOT NULL,
    "modality_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ticket_offers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ticket_types" ADD CONSTRAINT "ticket_types_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_modalities" ADD CONSTRAINT "ticket_modalities_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_offers" ADD CONSTRAINT "ticket_offers_ticket_type_id_fkey" FOREIGN KEY ("ticket_type_id") REFERENCES "ticket_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_offers" ADD CONSTRAINT "ticket_offers_modality_id_fkey" FOREIGN KEY ("modality_id") REFERENCES "ticket_modalities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
