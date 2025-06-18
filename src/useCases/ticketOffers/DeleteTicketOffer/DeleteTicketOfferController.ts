import { FastifyReply, FastifyRequest } from 'fastify';
import { DeleteTicketOfferUseCase } from './DeleteTicketOfferUseCase';

export class DeleteTicketOfferController {
    constructor(private deleteTicketOfferUseCase: DeleteTicketOfferUseCase) {}

    handle = async (req: FastifyRequest<{ Params: { ticket_offer_id: string } }>, res: FastifyReply) => {
        await this.deleteTicketOfferUseCase.execute(req.params.ticket_offer_id, req.user);
        return res.status(204).send();
    };
}
