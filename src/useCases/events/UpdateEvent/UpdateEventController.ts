import { FastifyReply, FastifyRequest } from 'fastify';
import { UpdateEventUseCase } from '@/useCases/events/UpdateEvent/UpdateEventUseCase';
import { UpdateEventRequestDTO } from '@/useCases/events';

export class UpdateEventController {
    constructor(private updateEventUseCase: UpdateEventUseCase) {}

    handle = async (
        req: FastifyRequest<{ Params: { event_id: string }; Body: UpdateEventRequestDTO }>,
        res: FastifyReply,
    ): Promise<void> => {
        const { event_id: id } = req.params;
        const event = await this.updateEventUseCase.execute(id, req.body);
        return res.status(200).send(event);
    };
}
