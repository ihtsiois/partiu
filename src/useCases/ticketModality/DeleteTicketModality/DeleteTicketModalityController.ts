import { FastifyReply, FastifyRequest } from 'fastify';
import { DeleteTickeModalityUseCase } from './DeleteTicketModalityUseCase';

export class DeleteTickeModalityController {
    constructor(private deleteTicketModalityUseCase: DeleteTickeModalityUseCase) {}

    handle = async (req: FastifyRequest<{ Params: { ticket_modality_id: string } }>, res: FastifyReply) => {
        await this.deleteTicketModalityUseCase.execute(req.params.ticket_modality_id);
        return res.status(204).send();
    };
}
