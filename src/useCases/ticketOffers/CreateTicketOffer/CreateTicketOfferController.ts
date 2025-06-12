import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateTicketOfferUseCase } from './CreateTicketOfferUseCase';
import { CreateTicketOfferRequestDTO } from './CreateTicketOfferDTO';

export class CreateTicketOfferController {
    constructor(private createTicketOfferUseCase: CreateTicketOfferUseCase) {}

    handle = async (
        req: FastifyRequest<{ Params: { ticket_type_id: string }; Body: CreateTicketOfferRequestDTO }>,
        res: FastifyReply,
    ) => {
        const ticketOffer = await this.createTicketOfferUseCase.execute(req.params.ticket_type_id, req.body);
        return res.status(201).send(ticketOffer);
    };
}
