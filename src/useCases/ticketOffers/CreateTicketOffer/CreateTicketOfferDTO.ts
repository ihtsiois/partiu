import { z } from 'zod';

export const createTicketOfferRequestSchema = z.object({
    ticket_type_id: z.string(),
    modality_id: z.string(),
});

export type CreateTicketOfferRequestDTO = z.infer<typeof createTicketOfferRequestSchema>;
