import { z } from 'zod';

export const updateEventRequestSchema = z.object({
    title: z.string().min(1, 'Required').optional(),
    type: z.enum(['online', 'in_person', 'hybrid']).optional(),
    is_private: z.boolean().optional(),
    absorve_fee: z.boolean().optional(),
    description: z.string().nullable().optional(),
    category_id: z.string().nullable().optional(),
    banner_url: z.string().url().nullable().optional(),
    thumbnail_url: z.string().url().nullable().optional(),
    opengraph_url: z.string().url().nullable().optional(),
    theme_color: z
        .string()
        .regex(/^#[0-9A-F]{6}[0-9a-f]{0,2}$/i)
        .nullable()
        .optional(),
    age_rating: z.enum(['for_all', 'min_10', 'min_12', 'min_14', 'min_16', 'min_18']).optional(),
    start_date: z.coerce.date().optional(),
    end_date: z.coerce.date().optional(),
    sales_starts_at: z.coerce.date().optional(),
    sales_ends_at: z.coerce.date().optional(),
    address_name: z.string().nullable().optional(),
    address_zip_code: z.string().nullable().optional(),
    address_country: z.string().nullable().optional(),
    address_region: z.string().nullable().optional(),
    address_city: z.string().nullable().optional(),
    address_line: z.string().nullable().optional(),
    gmaps_url: z.string().nullable().optional(),
});

export type UpdateEventRequestDTO = z.infer<typeof updateEventRequestSchema>;
