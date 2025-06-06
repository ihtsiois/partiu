import { z } from 'zod';

export const categoryResponse = z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    banner_url: z.string().nullable(),
    thumbnail_url: z.string().nullable(),
});
