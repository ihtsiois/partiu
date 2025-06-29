import { FastifyReply, FastifyRequest } from 'fastify';
import { IntrospectUseCase } from './IntrospectUseCase';
import { IntrospectRequestQueryDTO } from './IntrospectDTO';

export class IntrospectController {
    constructor(private introspectUseCase: IntrospectUseCase) {}

    handle = async (req: FastifyRequest<{ Querystring: IntrospectRequestQueryDTO }>, res: FastifyReply) => {
        const { access_token } = req.query;
        const user = await this.introspectUseCase.execute(access_token);
        return res.status(200).send(user);
    };
}
