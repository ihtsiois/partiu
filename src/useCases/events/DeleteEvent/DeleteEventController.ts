import { DeleteEventUseCase } from '@/useCases/events/DeleteEvent/DeleteEventUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';

export class DeleteEventController {
    constructor(private deleteEventUseCase: DeleteEventUseCase) {}

    handle = async (req: FastifyRequest<{ Params: { event_id: string } }>, res: FastifyReply): Promise<void> => {
        const { event_id: id } = req.params;
        await this.deleteEventUseCase.execute(id, req.user);
        return res.status(204).send();
    };
}
