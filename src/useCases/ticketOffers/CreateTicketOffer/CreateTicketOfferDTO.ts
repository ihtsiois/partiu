import { z } from 'zod';

export const createTicketOfferRequestSchema = z.object({
    title: z.string(),
    description: z.string().nullable().optional(),
});

export type CreateTicketOfferRequestDTO = z.infer<typeof createTicketOfferRequestSchema>;
