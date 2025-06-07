/*
  Warnings:

  - You are about to drop the column `banner_url` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail_url` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `banner_url` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `opengraph_url` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail_url` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `birth_date` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `document` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `document_type` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - Added the required column `display_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AssetSource" AS ENUM ('AMZ_S3', 'URL');

-- CreateEnum
CREATE TYPE "CustomerDocumentType" AS ENUM ('BR_CPF', 'PASSPORT');

-- CreateEnum
CREATE TYPE "CustomerGender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'UNDEFINED');

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "banner_url",
DROP COLUMN "thumbnail_url",
ADD COLUMN     "banner_asset_id" TEXT,
ADD COLUMN     "thumbnail_asset_id" TEXT;

-- AlterTable
ALTER TABLE "events" DROP COLUMN "banner_url",
DROP COLUMN "opengraph_url",
DROP COLUMN "thumbnail_url",
ADD COLUMN     "banner_asset_id" TEXT,
ADD COLUMN     "opengraph_asset_id" TEXT,
ADD COLUMN     "thumbnail_asset_id" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "birth_date",
DROP COLUMN "document",
DROP COLUMN "document_type",
DROP COLUMN "full_name",
DROP COLUMN "gender",
DROP COLUMN "phone",
ADD COLUMN     "display_name" TEXT NOT NULL,
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- DropEnum
DROP TYPE "UserDocumentType";

-- DropEnum
DROP TYPE "UserGender";

-- CreateTable
CREATE TABLE "assets" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "source" "AssetSource" NOT NULL,
    "resource" TEXT NOT NULL,
    "signed_url" BOOLEAN NOT NULL,
    "content_type" TEXT NOT NULL,
    "content_length" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "email" TEXT NOT NULL,
    "document_type" "CustomerDocumentType" NOT NULL,
    "document" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "legal_name" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "gender" "CustomerGender" NOT NULL,
    "phone_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_user_id_key" ON "customers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE INDEX "customers_email_idx" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_document_type_document_key" ON "customers"("document_type", "document");

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
