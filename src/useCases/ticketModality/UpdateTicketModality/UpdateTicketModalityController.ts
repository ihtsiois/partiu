import { FastifyReply, FastifyRequest } from 'fastify';
import { UpdateTicketModalityUseCase } from './UpdateTicketModalityUseCase';
import { UpdateTicketTypeRequestDTO } from '@/useCases/ticketType';

export class UpdateTicketModalityController {
    constructor(private updateTicketModalityUseCase: UpdateTicketModalityUseCase) {}

    handle = async (
        req: FastifyRequest<{ Params: { ticket_modality_id: string }; Body: UpdateTicketTypeRequestDTO }>,
        res: FastifyReply,
    ) => {
        const { ticket_modality_id: id } = req.params;
        const newTicketModality = await this.updateTicketModalityUseCase.execute(id, req.body);
        return res.status(200).send(newTicketModality);
    };
}
