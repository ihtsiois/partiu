import { z } from 'zod';

const feedEventResponseSchema = z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    type: z.string(),
    description: z.string().nullable(),
    banner_url: z.string().nullable(),
    thumbnail_url: z.string().nullable(),
    opengraph_url: z.string().nullable(),
    theme_color: z.string().nullable(),
    age_rating: z.string(),
    start_date: z.date(),
    end_date: z.date(),
    inline_address: z.string().nullable(),
    address_name: z.string().nullable(),
    address_zip_code: z.string().nullable(),
    address_country: z.string().nullable(),
    address_region: z.string().nullable(),
    address_city: z.string().nullable(),
    address_line: z.string().nullable(),
    gmaps_url: z.string().nullable(),
});

const feedSectionResponseSchema = z.object({
    title: z.string(),
    data: feedEventResponseSchema.array(),
});

export const getFeedResponseSchema = feedSectionResponseSchema.array();
