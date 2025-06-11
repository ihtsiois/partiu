import { FastifyReply, FastifyRequest } from 'fastify';
import { UpdateTicketTypeUseCase } from './UpdateTicketTypeUseCase';
import { UpdateTicketTypeRequestDTO } from './UpdateTicketTypeDTO';

export class UpdateTicketTypeController {
    constructor(private updateTicketTypeUseCase: UpdateTicketTypeUseCase) {}

    handle = async (
        req: FastifyRequest<{ Params: { ticket_type_id: string }; Body: UpdateTicketTypeRequestDTO }>,
        res: FastifyReply,
    ) => {
        const newTicketType = await this.updateTicketTypeUseCase.execute(req.params.ticket_type_id, req.body);
        return res.status(200).send(newTicketType);
    };
}
