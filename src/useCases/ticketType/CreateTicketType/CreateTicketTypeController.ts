import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateTicketTypeRequestDTO } from '@/useCases/ticketType/CreateTicketType/CreateTicketTypeDTO';
import { CreateTicketTypeUseCase } from '@/useCases/ticketType/CreateTicketType/CreateTicketTypeUseCase';

export class CreateTicketTypeController {
    constructor(private createTicketTypeUseCase: CreateTicketTypeUseCase) {}

    handle = async (
        req: FastifyRequest<{ Params: { event_id: string }; Body: CreateTicketTypeRequestDTO }>,
        res: FastifyReply,
    ) => {
        const ticketType = await this.createTicketTypeUseCase.execute(req.params.event_id, req.body, req.user);
        return res.status(201).send(ticketType);
    };
}
