import { FastifyTypedInstance } from '@/types/fastify';
import {
    createTicketOfferController,
    createTicketOfferRequestSchema,
    getTicketOfferByIDController,
    listTicketOffersController,
} from '@/useCases/ticketOffers';
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

    app.route({
        method: 'GET',
        url: '/ticket-type/:ticket_type_id',
        schema: {
            tags: ['Ticket Offers'],
            response: {
                200: schema.ticketOfferResponse.array(),
            },
        },
        handler: listTicketOffersController.handle,
    });

    app.route({
        method: 'GET',
        url: '/:ticket_offer_id',
        schema: {
            tags: ['Ticket Offers'],
            response: {
                200: schema.ticketOfferResponse,
            },
        },
        handler: getTicketOfferByIDController.handle,
    });
};
