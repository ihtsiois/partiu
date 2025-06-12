import { FastifyTypedInstance } from '@/types/fastify';
import {
    createTicketTypeController,
    createTicketTypeRequestSchema,
    deleteTicketTypeController,
    getTicketTypeByIDController,
    listTicketTypesController,
    updateTicketTypeController,
    updateTicketTypeRequestSchema,
} from '@/useCases/ticketType';
import * as schema from './schema';
import { z } from 'zod';

export default async (app: FastifyTypedInstance) => {
    app.route({
        method: 'POST',
        url: '/event/:event_id',
        schema: {
            tags: ['Ticket Types'],
            body: createTicketTypeRequestSchema,
            response: {
                201: schema.ticketTypeResponse,
            },
        },
        handler: createTicketTypeController.handle,
    });

    app.route({
        method: 'GET',
        url: '/event/:event_id',
        schema: {
            tags: ['Ticket Types'],
            response: {
                200: schema.ticketTypeResponse.array(),
            },
        },
        handler: listTicketTypesController.handle,
    });

    app.route({
        method: 'GET',
        url: '/:ticket_type_id',
        schema: {
            tags: ['Ticket Types'],
            response: {
                200: schema.ticketTypeResponse,
            },
        },
        handler: getTicketTypeByIDController.handle,
    });

    app.route({
        method: 'PATCH',
        url: '/:ticket_type_id',
        schema: {
            tags: ['Ticket Types'],
            body: updateTicketTypeRequestSchema,
            response: {
                200: schema.ticketTypeResponse,
            },
        },
        handler: updateTicketTypeController.handle,
    });

    app.route({
        method: 'DELETE',
        url: '/:ticket_type_id',
        schema: {
            tags: ['Ticket Types'],
            response: {
                204: z.void(),
            },
        },
        handler: deleteTicketTypeController.handle,
    });
};
