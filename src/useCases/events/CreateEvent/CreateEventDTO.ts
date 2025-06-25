import { z } from 'zod';

export const createEventRequestSchema = z.object({
    title: z.string().min(1, 'Required'),
    type: z.enum(['online', 'in_person', 'hybrid']),
    is_private: z.boolean(),
    absorve_fee: z.boolean(),
    description: z.string().nullable().optional(),
    category_id: z.string().nullable().optional(),
    theme_color: z
        .string()
        .regex(/^#[0-9A-F]{6}[0-9a-f]{0,2}$/i)
        .nullable()
        .optional(),
    age_rating: z.enum(['for_all', 'min_10', 'min_12', 'min_14', 'min_16', 'min_18']),
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
    sales_starts_at: z.coerce.date(),
    sales_ends_at: z.coerce.date(),
    address_name: z.string().nullable().optional(),
    address_zip_code: z.string().nullable().optional(),
    address_country: z.string().nullable().optional(),
    address_region: z.string().nullable().optional(),
    address_city: z.string().nullable().optional(),
    address_line: z.string().nullable().optional(),
    gmaps_url: z.string().nullable().optional(),
});

export type CreateEventRequestDTO = z.infer<typeof createEventRequestSchema>;
