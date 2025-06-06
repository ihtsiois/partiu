-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('online', 'in_person', 'hybrid');

-- CreateEnum
CREATE TYPE "EventAgeRating" AS ENUM ('for_all', 'min_10', 'min_12', 'min_14', 'min_16', 'min_18');

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "banner_url" TEXT,
    "thumbnail_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "is_private" BOOLEAN NOT NULL DEFAULT false,
    "service_fee" DOUBLE PRECISION NOT NULL DEFAULT 10,
    "absorve_fee" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "category_id" TEXT,
    "banner_url" TEXT,
    "thumbnail_url" TEXT,
    "opengraph_url" TEXT,
    "age_rating" "EventAgeRating" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "sales_starts_at" TIMESTAMP(3) NOT NULL,
    "sales_ends_at" TIMESTAMP(3) NOT NULL,
    "address_name" TEXT,
    "address_zip_code" TEXT,
    "address_country" TEXT,
    "address_region" TEXT,
    "address_city" TEXT,
    "address_line" TEXT,
    "gmaps_url" TEXT,
    "facebook_url" TEXT,
    "instagram_url" TEXT,
    "twitter_url" TEXT,
    "tiktok_url" TEXT,
    "site_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
