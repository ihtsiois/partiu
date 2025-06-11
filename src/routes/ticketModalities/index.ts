import { FastifyTypedInstance } from '@/types/fastify';
import { createTicketModalityController, createTicketModalityRequestSchema } from '@/useCases/ticketModality';
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
};
