import { z } from 'zod';

export const updateTicketTypeRequestSchema = z.object({
    name: z.string().optional(),
});

export type UpdateTicketTypeRequestDTO = z.input<typeof updateTicketTypeRequestSchema>;
