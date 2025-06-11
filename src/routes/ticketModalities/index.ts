import { FastifyTypedInstance } from '@/types/fastify';
import {
    createTicketModalityController,
    createTicketModalityRequestSchema,
    getTicketModalityByIDController,
    listTicketModalitiesController,
} from '@/useCases/ticketModality';
import * as schema from './schema';

export default async (app: FastifyTypedInstance) => {
    app.route({
        method: 'POST',
        url: '/event/:event_id',
        schema: {
            tags: ['Ticket Modalities'],
            body: createTicketModalityRequestSchema,
            response: {
                201: schema.ticketModalityResponse,
            },
        },
        handler: createTicketModalityController.handle,
    });

    app.route({
        method: 'GET',
        url: '/event/:event_id',
        schema: {
            tags: ['Ticket Modalities'],
            response: {
                200: schema.ticketModalityResponse.array(),
            },
        },
        handler: listTicketModalitiesController.handle,
    });

    app.route({
        method: 'GET',
        url: '/:ticket_modality_id',
        schema: {
            tags: ['Ticket Modalities'],
            response: {
                200: schema.ticketModalityResponse,
            },
        },
        handler: getTicketModalityByIDController.handle,
    });
};
