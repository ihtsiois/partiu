import { FastifyReply, FastifyRequest } from 'fastify';
import { GetTicketTypeByIDUseCase } from './GetTicketTypeByIDUseCase';

export class GetTicketTypeByIDController {
    constructor(private getTicketTypeByIDUseCase: GetTicketTypeByIDUseCase) {}

    handle = async (req: FastifyRequest<{ Params: { ticket_type_id: string } }>, res: FastifyReply) => {
        const ticketType = await this.getTicketTypeByIDUseCase.execute(req.params.ticket_type_id, req.user);
        return res.status(200).send(ticketType);
    };
}
