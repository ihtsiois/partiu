import { z } from 'zod';
import { FastifyTypedInstance } from '@/types/fastify';
import {
    createUserController,
    createUserRequestSchema,
    deleteUserController,
    findUserByIDController,
    findUserByIDResponseSchema,
    listUsersController,
    updateUserController,
    updateUserRequestSchema,
} from '@/useCases/users';
import * as schema from './schema';

export default async (app: FastifyTypedInstance) => {
    app.route({
        method: 'POST',
        url: '/',
        schema: {
            tags: ['Users'],
            description: 'Register new user',
            body: createUserRequestSchema,
            security: [{ bearerAuth: [] }],
            response: {
                201: schema.userResponse,
            },
        },
        preHandler: [app.authenticated],
        handler: createUserController.handle,
    });

    app.route({
        method: 'GET',
        url: '/',
        schema: {
            tags: ['Users'],
            description: 'List users',
            security: [{ bearerAuth: [] }],
            response: {
                200: schema.userResponse.array(),
            },
        },
        preHandler: [app.authenticated],
        handler: listUsersController.handle,
    });

    app.route({
        method: 'GET',
        url: '/:user_id',
        schema: {
            tags: ['Users'],
            description: 'Get user by id',
            security: [{ bearerAuth: [] }],
            response: {
                200: findUserByIDResponseSchema,
            },
        },
        preHandler: [app.authenticated],
        handler: findUserByIDController.handle,
    });

    app.route({
        method: 'PATCH',
        url: '/:user_id',
        schema: {
            tags: ['Users'],
            description: 'Update user by id',
            body: updateUserRequestSchema,
            security: [{ bearerAuth: [] }],
            response: {
                200: schema.userResponse,
            },
        },
        preHandler: [app.authenticated],
        handler: updateUserController.handle,
    });

    app.route({
        method: 'DELETE',
        url: '/:user_id',
        schema: {
            tags: ['Users'],
            description: 'Delete user by id',
            security: [{ bearerAuth: [] }],
            response: {
                204: z.void(),
            },
        },
        preHandler: [app.authenticated],
        handler: deleteUserController.handle,
    });
};
