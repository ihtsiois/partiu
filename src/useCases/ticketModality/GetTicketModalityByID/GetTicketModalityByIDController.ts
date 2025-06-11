import { FastifyReply, FastifyRequest } from 'fastify';
import { GetTicketModalityByIDUseCase } from './GetTicketModalityByIDUseCase';

export class GetTicketModalityByIDController {
    constructor(private getTicketModalityByIDUseCase: GetTicketModalityByIDUseCase) {}

    handle = async (req: FastifyRequest<{ Params: { ticket_modality_id: string } }>, res: FastifyReply) => {
        const ticketModality = await this.getTicketModalityByIDUseCase.execute(req.params.ticket_modality_id);
        return res.status(200).send(ticketModality);
    };
}
