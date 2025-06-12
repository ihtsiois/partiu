import { z } from 'zod';

export const updateTicketOfferRequestSchema = z.object({
    title: z.string().optional(),
    description: z.string().nullable().optional(),
});

export type UpdateTicketOfferRequestDTO = z.infer<typeof updateTicketOfferRequestSchema>;
