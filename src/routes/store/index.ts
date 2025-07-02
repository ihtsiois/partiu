import { FastifyTypedInstance } from '@/types/fastify';
import { getEventController, getEventResponseSchema, getFeedController, getFeedResponseSchema } from '@/useCases/store';

export default async (app: FastifyTypedInstance) => {
    app.route({
        method: 'GET',
        url: '/events/:event_slug',
        schema: {
            tags: ['Store'],
            description: 'Get event',
            response: {
                200: getEventResponseSchema,
            },
        },
        handler: getEventController.handle,
    });

    app.route({
        method: 'GET',
        url: '/feed',
        schema: {
            tags: ['Store'],
            description: 'Get Feed',
            response: {
                200: getFeedResponseSchema,
            },
        },
        handler: getFeedController.handle,
    });
};
