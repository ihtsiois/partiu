import { AppError } from '@/plugins/errorHandler';
import { ITicketTypesRepository } from '@/repositories/ITicketTypesRepository';

export class GetTicketTypeByIDUseCase {
    constructor(private ticketTypesRepo: ITicketTypesRepository) {}

    async execute(id: string) {
        // Get Ticket Type
        const ticketType = await this.ticketTypesRepo.findById(id);
        if (!ticketType) throw new AppError('ticket_type_not_found', 404);

        return ticketType;
    }
}
