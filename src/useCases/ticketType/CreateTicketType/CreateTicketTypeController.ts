import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateTicketTypeRequestDTO } from '@/useCases/ticketType/CreateTicketType/CreateTicketTypeDTO';
import { CreateTicketTypeUseCase } from '@/useCases/ticketType/CreateTicketType/CreateTicketTypeUseCase';

export class CreateTicketTypeController {
    constructor(private createTicketTypeUseCase: CreateTicketTypeUseCase) {}

    handle = async (
        req: FastifyRequest<{ Params: { event_id: string }; Body: CreateTicketTypeRequestDTO }>,
        res: FastifyReply,
    ) => {
        const ticketType = await this.createTicketTypeUseCase.execute({ event_id: req.params.event_id, ...req.body });
        return res.status(201).send(ticketType);
    };
}
