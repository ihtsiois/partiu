import { FastifyTypedInstance } from '@/types/fastify';
import { createTicketOfferController, createTicketOfferRequestSchema } from '@/useCases/ticketOffers';
import * as schema from './schema';

export default async (app: FastifyTypedInstance) => {
    app.route({
        method: 'POST',
        url: '/event/:event_id',
        schema: {
            tags: ['Ticket Offers'],
            body: createTicketOfferRequestSchema,
            response: {
                201: schema.ticketOfferResponse,
            },
        },
        handler: createTicketOfferController.handle,
    });
};
