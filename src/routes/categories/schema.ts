import { z } from 'zod';

export const categoryResponse = z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    description: z.string(),
});
