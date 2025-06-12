/*
  Warnings:

  - You are about to drop the column `modality_id` on the `ticket_offers` table. All the data in the column will be lost.
  - You are about to drop the `ticket_modalities` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `ticket_offers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ticket_modalities" DROP CONSTRAINT "ticket_modalities_event_id_fkey";

-- DropForeignKey
ALTER TABLE "ticket_offers" DROP CONSTRAINT "ticket_offers_modality_id_fkey";

-- AlterTable
ALTER TABLE "ticket_offers" DROP COLUMN "modality_id",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "ticket_modalities";
