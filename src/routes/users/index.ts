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
            response: {
                201: schema.userResponse,
            },
        },
        handler: createUserController.handle,
    });

    app.route({
        method: 'GET',
        url: '/',
        schema: {
            tags: ['Users'],
            description: 'List users',
            response: {
                200: schema.userResponse.array(),
            },
        },
        handler: listUsersController.handle,
    });

    app.route({
        method: 'GET',
        url: '/:user_id',
        schema: {
            tags: ['Users'],
            description: 'Get user by id',
            response: {
                200: findUserByIDResponseSchema,
            },
        },
        handler: findUserByIDController.handle,
    });

    app.route({
        method: 'PUT',
        url: '/:user_id',
        schema: {
            tags: ['Users'],
            description: 'Update user by id',
            body: updateUserRequestSchema,
            response: {
                200: schema.userResponse,
            },
        },
        handler: updateUserController.handle,
    });

    app.route({
        method: 'DELETE',
        url: '/:user_id',
        schema: {
            tags: ['Users'],
            description: 'Delete user by id',
            response: {
                204: z.void(),
            },
        },
        handler: deleteUserController.handle,
    });
};
