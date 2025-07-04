import { z } from 'zod';
export const categoryResponseSchema = z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    banner_url: z.string().nullable(),
    thumbnail_url: z.string().nullable(),
});

export const ticketOfferResponseSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    price: z.number(),
});

export const ticketTypeResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    offers: ticketOfferResponseSchema.array(),
});

export const getEventResponseSchema = z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    type: z.string(),
    service_fee: z.number(),
    is_on_sale: z.boolean(),
    ticket_types: ticketTypeResponseSchema.array(),
    description: z.string().nullable(),
    category: categoryResponseSchema.nullable(),
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

export type GetEventResponseDTO = z.infer<typeof getEventResponseSchema>;
