import { FastifyTypedInstance } from '@/types/fastify';
import {
    getFileController,
    uploadFileController,
    uploadFileRequestSchema,
    uploadFileResponseSchema,
} from '@/useCases/files';

export default async (app: FastifyTypedInstance) => {
    app.route({
        method: 'POST',
        url: '/upload',
        schema: {
            tags: ['Files'],
            description: 'Upload file',
            body: uploadFileRequestSchema,
            responses: {
                200: uploadFileResponseSchema,
            },
        },
        handler: uploadFileController.handle,
    });

    app.route({
        method: 'GET',
        url: '/:asset_id',
        schema: {
            tags: ['Files'],
            description: 'Get file',
        },
        handler: getFileController.handle,
    });
};
