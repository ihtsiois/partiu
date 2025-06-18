import { z } from 'zod';
import { FastifyTypedInstance } from '@/types/fastify';
import * as schema from './schema';
import {
    createEventController,
    createEventRequestSchema,
    deleteEventController,
    getEventByIDController,
    listEventsController,
    updateEventController,
    updateEventRequestSchema,
} from '@/useCases/events';

export default async (app: FastifyTypedInstance) => {
    app.route({
        method: 'POST',
        url: '/',
        schema: {
            tags: ['Events'],
            description: 'Register event',
            body: createEventRequestSchema,
            security: [{ bearerAuth: [] }],
            response: {
                201: schema.eventResponse,
            },
        },
        preHandler: [app.authenticated],
        handler: createEventController.handle,
    });

    app.route({
        method: 'GET',
        url: '/',
        schema: {
            tags: ['Events'],
            description: 'List events',
            security: [{ bearerAuth: [] }],
            response: {
                200: schema.eventResponse.array(),
            },
        },
        preHandler: [app.authenticated],
        handler: listEventsController.handle,
    });

    app.route({
        method: 'GET',
        url: '/:event_id',
        schema: {
            tags: ['Events'],
            description: 'Get event by ID',
            security: [{ bearerAuth: [] }],
            response: {
                200: schema.eventResponse,
            },
        },
        preHandler: [app.authenticated],
        handler: getEventByIDController.handle,
    });

    app.route({
        method: 'PATCH',
        url: '/:event_id',
        schema: {
            tags: ['Events'],
            description: 'Update event by ID',
            body: updateEventRequestSchema,
            security: [{ bearerAuth: [] }],
            response: {
                200: schema.eventResponse,
            },
        },
        preHandler: [app.authenticated],
        handler: updateEventController.handle,
    });

    app.route({
        method: 'DELETE',
        url: '/:event_id',
        schema: {
            tags: ['Events'],
            description: 'Delete event by ID',
            security: [{ bearerAuth: [] }],
            response: {
                204: z.void(),
            },
        },
        preHandler: [app.authenticated],
        handler: deleteEventController.handle,
    });
};
