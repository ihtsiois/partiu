import { CreateEventUseCase } from '@/useCases/events/CreateEvent/CreateEventUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateEventRequestDTO } from '@/useCases/events';

export class CreateEventController {
    constructor(private createEventUseCase: CreateEventUseCase) {}

    handle = async (req: FastifyRequest<{ Body: CreateEventRequestDTO }>, res: FastifyReply): Promise<void> => {
        const event = await this.createEventUseCase.execute(req.body);
        return res.status(201).send(event);
    };
}
