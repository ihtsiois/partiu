import { FastifyReply, FastifyRequest } from 'fastify';
import { DeleteTicketTypeUseCase } from './DeleteTicketTypeUseCase';

export class DeleteTicketTypeController {
    constructor(private deleteTicketTypeUseCase: DeleteTicketTypeUseCase) {}

    handle = async (req: FastifyRequest<{ Params: { ticket_type_id: string } }>, res: FastifyReply) => {
        await this.deleteTicketTypeUseCase.execute(req.params.ticket_type_id);
        return res.status(204).send();
    };
}
