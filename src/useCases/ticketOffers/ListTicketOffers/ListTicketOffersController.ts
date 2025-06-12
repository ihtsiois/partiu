import { FastifyReply, FastifyRequest } from 'fastify';
import { ListTicketOffersUseCase } from './ListTicketOffersUseCase';

export class ListTicketOffersController {
    constructor(private listTicketOffersUseCase: ListTicketOffersUseCase) {}

    handle = async (req: FastifyRequest<{ Params: { ticket_type_id: string } }>, res: FastifyReply) => {
        const ticketOffers = await this.listTicketOffersUseCase.execute(req.params.ticket_type_id);
        return res.status(200).send(ticketOffers);
    };
}
