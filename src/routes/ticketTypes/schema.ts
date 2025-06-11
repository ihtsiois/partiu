import { z } from 'zod';

export const ticketTypeResponse = z.object({
    id: z.string(),
    event_id: z.string(),
    name: z.string(),
});
