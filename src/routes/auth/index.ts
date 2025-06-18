import { FastifyTypedInstance } from '@/types/fastify';
import { signinController, signinRequestSchema, signinResponseSchema } from '@/useCases/auth';

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
};
