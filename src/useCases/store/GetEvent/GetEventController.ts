import { GetEventUseCase } from '@/useCases/store/GetEvent/GetEventUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';

export class GetEventController {
    constructor(private getEventUseCase: GetEventUseCase) {}

    handle = async (req: FastifyRequest<{ Params: { event_slug: string } }>, res: FastifyReply): Promise<void> => {
        const { event_slug: slug } = req.params;
        const event = await this.getEventUseCase.execute(slug);
        return res.status(200).send(event);
    };
}
