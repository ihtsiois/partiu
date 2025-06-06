import { GetEventByIDUseCase } from '@/useCases/events/GetEventByID/GetEventByIDUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';

export class GetEventByIDController {
    constructor(private getEventByIDUseCase: GetEventByIDUseCase) {}

    handle = async (req: FastifyRequest<{ Params: { event_id: string } }>, res: FastifyReply): Promise<void> => {
        const { event_id: id } = req.params;
        const event = await this.getEventByIDUseCase.execute(id);
        return res.status(200).send(event);
    };
}
