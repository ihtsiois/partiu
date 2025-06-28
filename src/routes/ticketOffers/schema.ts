import { z } from 'zod';

export const ticketOfferResponse = z.object({
    id: z.string(),
    ticket_type_id: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    price: z.number(),
    quantity: z.number(),
});
