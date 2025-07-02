import { FastifyReply, FastifyRequest } from 'fastify';
import { GetFeedUseCase } from './GetFeedUseCase';

export class GetFeedController {
    constructor(private getFeedUseCase: GetFeedUseCase) {}

    handle = async (req: FastifyRequest, res: FastifyReply) => {
        const feed = await this.getFeedUseCase.execute();
        return res.status(200).send(feed);
    };
}
