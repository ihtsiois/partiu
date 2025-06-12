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
            response: {
                201: schema.eventResponse,
            },
        },
        handler: createEventController.handle,
    });

    app.route({
        method: 'GET',
        url: '/',
        schema: {
            tags: ['Events'],
            description: 'List events',
            response: {
                200: schema.eventResponse.array(),
            },
        },
        handler: listEventsController.handle,
    });

    app.route({
        method: 'GET',
        url: '/:event_id',
        schema: {
            tags: ['Events'],
            description: 'Get event by ID',
            response: {
                200: schema.eventResponse,
            },
        },
        handler: getEventByIDController.handle,
    });

    app.route({
        method: 'PATCH',
        url: '/:event_id',
        schema: {
            tags: ['Events'],
            description: 'Update event by ID',
            body: updateEventRequestSchema,
            response: {
                200: schema.eventResponse,
            },
        },
        handler: updateEventController.handle,
    });

    app.route({
        method: 'DELETE',
        url: '/:event_id',
        schema: {
            tags: ['Events'],
            description: 'Delete event by ID',

            response: {
                204: z.void(),
            },
        },
        handler: deleteEventController.handle,
    });
};
