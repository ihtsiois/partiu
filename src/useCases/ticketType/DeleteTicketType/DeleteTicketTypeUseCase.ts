import { AppError } from '@/plugins/errorHandler';
import { ITicketTypesRepository } from '@/repositories/ITicketTypesRepository';

export class DeleteTicketTypeUseCase {
    constructor(private ticketTypesRepo: ITicketTypesRepository) {}

    async execute(id: string) {
        // Get Ticket Type
        const ticketType = await this.ticketTypesRepo.findByID(id);
        if (!ticketType) throw new AppError('ticket_type_not_exists', 4 - 4);

        // Delete Ticket Type
        await this.ticketTypesRepo.delete(ticketType.id);
        return;
    }
}
