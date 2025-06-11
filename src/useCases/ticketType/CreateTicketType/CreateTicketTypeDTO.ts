import { z } from 'zod';

export const createTicketTypeRequestSchema = z.object({
    name: z.string(),
});

export type CreateTicketTypeRequestDTO = z.input<typeof createTicketTypeRequestSchema>;
