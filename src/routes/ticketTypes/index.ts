import { FastifyTypedInstance } from '@/types/fastify';
import {
    createTicketTypeController,
    createTicketTypeRequestSchema,
    listTicketTypesController,
} from '@/useCases/ticketType';
import * as schema from './schema';

export default async (app: FastifyTypedInstance) => {
    app.route({
        method: 'POST',
        url: '/',
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
        url: '/',
        schema: {
            tags: ['Ticket Types'],
            response: {
                200: schema.ticketTypeResponse.array(),
            },
        },
        handler: listTicketTypesController.handle,
    });
};
