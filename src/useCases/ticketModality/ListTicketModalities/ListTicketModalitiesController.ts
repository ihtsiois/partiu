import { FastifyReply, FastifyRequest } from 'fastify';
import { ListTicketModalitiesUseCase } from './ListTicketModalitiesUseCase';

export class ListTicketModalitiesController {
    constructor(private listTicketModalitiesUseCase: ListTicketModalitiesUseCase) {}

    handle = async (req: FastifyRequest<{ Params: { event_id: string } }>, res: FastifyReply) => {
        const ticketModalities = await this.listTicketModalitiesUseCase.execute(req.params.event_id);
        return res.status(200).send(ticketModalities);
    };
}
