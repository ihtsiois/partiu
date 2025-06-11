import { z } from 'zod';

export const createTicketModalityRequestSchema = z.object({
    name: z.string(),
    description: z.string().nullable().optional(),
});

export type CreateTicketModalityRequestDTO = z.infer<typeof createTicketModalityRequestSchema>;
