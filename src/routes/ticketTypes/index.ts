import { FastifyTypedInstance } from '@/types/fastify';
import {
    createTicketTypeController,
    createTicketTypeRequestSchema,
    getTicketTypeByIDController,
    listTicketTypesController,
} from '@/useCases/ticketType';
import * as schema from './schema';

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
};
