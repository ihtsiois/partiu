import { FastifyTypedInstance } from '@/types/fastify';
import {
    createTicketModalityController,
    createTicketModalityRequestSchema,
    deleteTicketModalityController,
    getTicketModalityByIDController,
    listTicketModalitiesController,
    updateTicketModalityController,
    updateTicketModalityRequestSchema,
} from '@/useCases/ticketModality';
import * as schema from './schema';
import { z } from 'zod';

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

    app.route({
        method: 'PUT',
        url: '/:ticket_modality_id',
        schema: {
            tags: ['Ticket Modalities'],
            body: updateTicketModalityRequestSchema,
            response: {
                200: schema.ticketModalityResponse,
            },
        },
        handler: updateTicketModalityController.handle,
    });

    app.route({
        method: 'DELETE',
        url: '/:ticket_modality_id',
        schema: {
            tags: ['Ticket Modalities'],
            response: {
                204: z.void(),
            },
        },
        handler: deleteTicketModalityController.handle,
    });
};
