import { z } from 'zod';

export const updateCategoryRequestSchema = z.object({
    slug: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    banner_url: z.string().url().optional().nullable(),
    thumbnail_url: z.string().url().optional().nullable(),
});

export type UpdateCategoryRequestDTO = z.infer<typeof updateCategoryRequestSchema>;
