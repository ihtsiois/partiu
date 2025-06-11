import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateTicketModalityUseCase } from './CreateTicketModalityUseCase';
import { CreateTicketTypeRequestDTO } from '@/useCases/ticketType';

export class CreateTicketModalityControlller {
    constructor(private createTicketModalityUseCase: CreateTicketModalityUseCase) {}

    handle = async (
        req: FastifyRequest<{ Params: { event_id: string }; Body: CreateTicketTypeRequestDTO }>,
        res: FastifyReply,
    ) => {
        const ticketModality = await this.createTicketModalityUseCase.execute(req.params.event_id, req.body);
        return res.status(201).send(ticketModality);
    };
}
