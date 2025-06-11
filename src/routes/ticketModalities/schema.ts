import { z } from 'zod';

export const ticketModalityResponse = z.object({
    id: z.string(),
    event_id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
});
