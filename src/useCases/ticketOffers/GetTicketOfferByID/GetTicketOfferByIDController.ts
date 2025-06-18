import { FastifyReply, FastifyRequest } from 'fastify';
import { GetTicketOfferByIDUseCase } from './GetTicketOfferByIDUseCase';

export class GetTicketOfferByIDController {
    constructor(private getTicketOfferByIDUseCase: GetTicketOfferByIDUseCase) {}

    handle = async (req: FastifyRequest<{ Params: { ticket_offer_id: string } }>, res: FastifyReply) => {
        const ticketOffer = await this.getTicketOfferByIDUseCase.execute(req.params.ticket_offer_id, req.user);
        return res.status(200).send(ticketOffer);
    };
}
