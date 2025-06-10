/*
  Warnings:

  - You are about to drop the column `banner_asset_id` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail_asset_id` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `banner_asset_id` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `opengraph_asset_id` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail_asset_id` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "banner_asset_id",
DROP COLUMN "thumbnail_asset_id",
ADD COLUMN     "banner_url" TEXT,
ADD COLUMN     "thumbnail_url" TEXT;

-- AlterTable
ALTER TABLE "events" DROP COLUMN "banner_asset_id",
DROP COLUMN "opengraph_asset_id",
DROP COLUMN "thumbnail_asset_id",
ADD COLUMN     "banner_url" TEXT,
ADD COLUMN     "opengraph_url" TEXT,
ADD COLUMN     "thumbnail_url" TEXT;
