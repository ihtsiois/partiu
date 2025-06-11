import { z } from 'zod';

export const createTicketTypeRequestSchema = z.object({
    event_id: z.string(),
    name: z.string(),
});

export type CreateTicketTypeRequestDTO = z.input<typeof createTicketTypeRequestSchema>;
