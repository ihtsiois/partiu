import { z } from 'zod';
import { FastifyTypedInstance } from '@/types/fastify';
import * as schema from './schema';
import {
    createCategoryController,
    createCategoryRequestSchema,
    deleteCategoryController,
    findCategoryByIDController,
    listCategoriesController,
    updateCategoryController,
    updateCategoryRequestSchema,
} from '@/useCases/category';

export default async (app: FastifyTypedInstance) => {
    app.route({
        method: 'POST',
        url: '/',
        schema: {
            tags: ['Categories'],
            description: 'Register category',
            body: createCategoryRequestSchema,
            security: [{ bearerAuth: [] }],
            response: {
                201: schema.categoryResponse,
            },
        },
        preHandler: [app.authenticated],
        handler: createCategoryController.handle,
    });

    app.route({
        method: 'GET',
        url: '/',
        schema: {
            tags: ['Categories'],
            description: 'List categories',
            security: [{ bearerAuth: [] }],
            response: {
                200: schema.categoryResponse.array(),
            },
        },
        preHandler: [app.authenticated],
        handler: listCategoriesController.handle,
    });

    app.route({
        method: 'GET',
        url: '/:category_id',
        schema: {
            tags: ['Categories'],
            description: 'Get category by ID',
            security: [{ bearerAuth: [] }],
            response: {
                200: schema.categoryResponse,
            },
        },
        preHandler: [app.authenticated],
        handler: findCategoryByIDController.handle,
    });

    app.route({
        method: 'PATCH',
        url: '/:category_id',
        schema: {
            tags: ['Categories'],
            description: 'Update category by ID',
            body: updateCategoryRequestSchema,
            security: [{ bearerAuth: [] }],
            response: {
                200: schema.categoryResponse,
            },
        },
        preHandler: [app.authenticated],
        handler: updateCategoryController.handle,
    });

    app.route({
        method: 'DELETE',
        url: '/:category_id',
        schema: {
            tags: ['Categories'],
            description: 'Delete category by ID',
            security: [{ bearerAuth: [] }],
            response: {
                204: z.void(),
            },
        },
        preHandler: [app.authenticated],
        handler: deleteCategoryController.handle,
    });
};
