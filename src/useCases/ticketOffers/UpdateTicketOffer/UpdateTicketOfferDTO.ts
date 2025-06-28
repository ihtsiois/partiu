import { z } from 'zod';

export const updateTicketOfferRequestSchema = z.object({
    title: z.string().optional(),
    description: z.string().nullable().optional(),
    price: z.number().int().min(0).optional(),
    quantity: z.number().int().min(1).optional(),
});

export type UpdateTicketOfferRequestDTO = z.infer<typeof updateTicketOfferRequestSchema>;
