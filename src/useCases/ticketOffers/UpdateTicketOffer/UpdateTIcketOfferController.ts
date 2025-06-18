import { FastifyReply, FastifyRequest } from 'fastify';
import { UpdateTicketOfferUseCase } from './UpdateTicketOfferUseCase';
import { UpdateTicketOfferRequestDTO } from './UpdateTicketOfferDTO';

export class UpdateTicketOfferController {
    constructor(private updateTicketOfferUseCase: UpdateTicketOfferUseCase) {}

    handle = async (
        req: FastifyRequest<{ Params: { ticket_offer_id: string }; Body: UpdateTicketOfferRequestDTO }>,
        res: FastifyReply,
    ) => {
        const newTicketOffer = await this.updateTicketOfferUseCase.handle(
            req.params.ticket_offer_id,
            req.body,
            req.user,
        );
        return res.status(200).send(newTicketOffer);
    };
}
