import { ListEventsUseCase } from '@/useCases/events/ListEvents/ListEventsUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';

export class ListEventsController {
    constructor(private listEventsUseCase: ListEventsUseCase) {}

    handle = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
        const events = await this.listEventsUseCase.execute();
        return res.status(200).send(events);
    };
}