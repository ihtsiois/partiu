import { z } from "zod";

export const ticketOfferResponse = z.object({
    id: z.string(),
    ticket_type_id: z.string(),
    modality_id: z.string()
})