import { z } from 'zod';

export const createCategoryRequestSchema = z.object({
    slug: z.string().optional(),
    title: z.string(),
    description: z.string(),
});

export type CreateCategoryRequestDTO = z.infer<typeof createCategoryRequestSchema>;
