import { z } from 'zod';

export const createTicketOfferRequestSchema = z.object({
    title: z.string(),
    description: z.string().nullable().optional(),
    price: z.number().int().min(0),
    quantity: z.number().int().min(1),
});

export type CreateTicketOfferRequestDTO = z.infer<typeof createTicketOfferRequestSchema>;
