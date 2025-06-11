import { ListTicketTypesUseCase } from '@/useCases/ticketType/ListTicketTypes/ListTicketTypesUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';

export class ListTicketTypesController {
    constructor(private listTicketTypesUseCase: ListTicketTypesUseCase) {}

    handle = async (req: FastifyRequest<{ Params: { event_id: string } }>, res: FastifyReply) => {
        const ticketTypes = await this.listTicketTypesUseCase.execute(req.params.event_id);
        return res.status(200).send(ticketTypes);
    };
}
