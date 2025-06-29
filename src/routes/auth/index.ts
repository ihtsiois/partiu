import { FastifyTypedInstance } from '@/types/fastify';
import {
    refreshController,
    refreshRequestSchema,
    refreshResponseSchema,
    signinController,
    signinRequestSchema,
    signinResponseSchema,
} from '@/useCases/auth';
import { introspectController, introspectRequestQuerySchema } from '@/useCases/auth/Introspect';
import * as schema from './schema';

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

    app.route({
        method: 'GET',
        url: '/introspect',
        schema: {
            tags: ['Auth'],
            querystring: introspectRequestQuerySchema,
            response: { 200: schema.authSubjectResponse },
        },
        handler: introspectController.handle,
    });
};
