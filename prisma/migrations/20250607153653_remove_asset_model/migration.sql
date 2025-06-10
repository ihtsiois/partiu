/*
  Warnings:

  - You are about to drop the `assets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "assets" DROP CONSTRAINT "assets_owner_id_fkey";

-- DropTable
DROP TABLE "assets";

-- DropEnum
DROP TYPE "AssetSource";
