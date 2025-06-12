import { z } from 'zod';

export const createTicketOfferRequestSchema = z.object({
    ticket_type_id: z.string(),
    title: z.string(),
    description: z.string().nullable().optional(),
});

export type CreateTicketOfferRequestDTO = z.infer<typeof createTicketOfferRequestSchema>;
