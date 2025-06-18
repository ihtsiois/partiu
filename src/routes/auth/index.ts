import { FastifyTypedInstance } from '@/types/fastify';
import {
    refreshController,
    refreshRequestSchema,
    refreshResponseSchema,
    signinController,
    signinRequestSchema,
    signinResponseSchema,
} from '@/useCases/auth';

export default async (app: FastifyTypedInstance) => {
    app.route({
        method: 'POST',
        url: '/signin',
        schema: {
            tags: ['Auth'],
            body: signinRequestSchema,
            response: {
                200: signinResponseSchema,
            },
        },
        handler: signinController.handle,
    });

    app.route({
        method: 'POST',
        url: '/refresh',
        schema: {
            tags: ['Auth'],
            body: refreshRequestSchema,
            response: {
                200: refreshResponseSchema,
            },
        },
        handler: refreshController.handle,
    });
};
