import { z } from 'zod';

export const createCategoryRequestSchema = z.object({
    slug: z.string().optional(),
    title: z.string(),
    description: z.string(),
    banner_url: z.string().url().optional().nullable(),
    thumbnail_url: z.string().url().optional().nullable(),
});

export type CreateCategoryRequestDTO = z.infer<typeof createCategoryRequestSchema>;
