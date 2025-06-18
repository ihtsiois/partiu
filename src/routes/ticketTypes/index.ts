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
            security: [{ bearerAuth: [] }],
            response: {
                201: schema.ticketTypeResponse,
            },
        },
        preHandler: [app.authenticated],
        handler: createTicketTypeController.handle,
    });

    app.route({
        method: 'GET',
        url: '/event/:event_id',
        schema: {
            tags: ['Ticket Types'],
            security: [{ bearerAuth: [] }],
            response: {
                200: schema.ticketTypeResponse.array(),
            },
        },
        preHandler: [app.authenticated],
        handler: listTicketTypesController.handle,
    });

    app.route({
        method: 'GET',
        url: '/:ticket_type_id',
        schema: {
            tags: ['Ticket Types'],
            security: [{ bearerAuth: [] }],
            response: {
                200: schema.ticketTypeResponse,
            },
        },
        preHandler: [app.authenticated],
        handler: getTicketTypeByIDController.handle,
    });

    app.route({
        method: 'PATCH',
        url: '/:ticket_type_id',
        schema: {
            tags: ['Ticket Types'],
            body: updateTicketTypeRequestSchema,
            security: [{ bearerAuth: [] }],
            response: {
                200: schema.ticketTypeResponse,
            },
        },
        preHandler: [app.authenticated],
        handler: updateTicketTypeController.handle,
    });

    app.route({
        method: 'DELETE',
        url: '/:ticket_type_id',
        schema: {
            tags: ['Ticket Types'],
            security: [{ bearerAuth: [] }],
            response: {
                204: z.void(),
            },
        },
        preHandler: [app.authenticated],
        handler: deleteTicketTypeController.handle,
    });
};
