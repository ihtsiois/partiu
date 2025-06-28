/*
  Warnings:

  - Added the required column `price` to the `ticket_offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `ticket_offers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ticket_offers" ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ticket_types" ADD COLUMN     "description" TEXT;
