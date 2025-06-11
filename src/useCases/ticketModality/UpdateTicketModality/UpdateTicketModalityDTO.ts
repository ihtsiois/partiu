import { z } from 'zod';

export const updateTicketModalityRequestSchema = z.object({
    name: z.string().optional(),
    description: z.string().nullable().optional(),
});
