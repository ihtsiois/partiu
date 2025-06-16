import { FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { FastifyTypedInstance } from '@/types/fastify';

export class AppError extends Error {
    public readonly name: string;
    public readonly httpCode: number;

    constructor(name: string, httpCode: number) {
        super(name);
        this.name = name;
        this.httpCode = httpCode;
    }
}

export default fp((app: FastifyTypedInstance) => {
    const errorHandler = (err: any, req: FastifyRequest, res: FastifyReply) => {
        if (err.validation) {
            return res.status(400).send({
                error: 'BadRequest',
                issues: err.validation?.map((i: any) => ({
                    path: i.instancePath,
                    message: i.message,
                })),
            });
        }

        if (err instanceof AppError) {
            return res.status(err.httpCode).send({
                error: err.name,
            });
        }

        req.log.error(err);
        return res.status(500).send({ error: err });
    };

    const notFoundHandler = (req: FastifyRequest, res: FastifyReply) => res.status(404).send({ error: 'NotFound' });

    app.setErrorHandler(errorHandler);
    app.setNotFoundHandler(notFoundHandler);
});
