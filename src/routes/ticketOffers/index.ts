import { FastifyTypedInstance } from '@/types/fastify';
import {
    createTicketOfferController,
    createTicketOfferRequestSchema,
    getTicketOfferByIDController,
    listTicketOffersController,
    updateTicketOfferController,
    updateTicketOfferRequestSchema,
} from '@/useCases/ticketOffers';
import * as schema from './schema';
import { z } from 'zod';
import { deleteTicketOfferController } from '@/useCases/ticketOffers/DeleteTicketOffer';

export default async (app: FastifyTypedInstance) => {
    app.route({
        method: 'POST',
        url: '/ticket-type/:ticket_type_id',
        schema: {
            tags: ['Ticket Offers'],
            body: createTicketOfferRequestSchema,
            security: [{ bearerAuth: [] }],
            response: {
                201: schema.ticketOfferResponse,
            },
        },
        preHandler: [app.authenticated],
        handler: createTicketOfferController.handle,
    });

    app.route({
        method: 'GET',
        url: '/ticket-type/:ticket_type_id',
        schema: {
            tags: ['Ticket Offers'],
            security: [{ bearerAuth: [] }],
            response: {
                200: schema.ticketOfferResponse.array(),
            },
        },
        preHandler: [app.authenticated],
        handler: listTicketOffersController.handle,
    });

    app.route({
        method: 'GET',
        url: '/:ticket_offer_id',
        schema: {
            tags: ['Ticket Offers'],
            security: [{ bearerAuth: [] }],
            response: {
                200: schema.ticketOfferResponse,
            },
        },
        preHandler: [app.authenticated],
        handler: getTicketOfferByIDController.handle,
    });

    app.route({
        method: 'PATCH',
        url: '/:ticket_offer_id',
        schema: {
            tags: ['Ticket Offers'],
            body: updateTicketOfferRequestSchema,
            security: [{ bearerAuth: [] }],
            response: {
                200: schema.ticketOfferResponse,
            },
        },
        preHandler: [app.authenticated],
        handler: updateTicketOfferController.handle,
    });

    app.route({
        method: 'DELETE',
        url: '/:ticket_offer_id',
        schema: {
            tags: ['Ticket Offers'],
            security: [{ bearerAuth: [] }],
            response: {
                204: z.void(),
            },
        },
        preHandler: [app.authenticated],
        handler: deleteTicketOfferController.handle,
    });
};
