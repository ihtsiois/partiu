import { User } from '@/entities/User';
import { AppError } from '@/plugins/errorHandler';
import { ITicketTypesRepository } from '@/repositories/ITicketTypesRepository';

export class DeleteTicketTypeUseCase {
    constructor(private ticketTypesRepo: ITicketTypesRepository) {}

    async execute(id: string, user: User) {
        // Get Ticket Type
        const ticketType = await this.ticketTypesRepo.findById(id);
        if (!ticketType) throw new AppError('ticket_type_not_exists', 404);

        // Validate Ownership
        const owner = await this.ticketTypesRepo.getOwnership(ticketType.id);
        if (!owner || owner.id !== user.id) throw new AppError('ticket_type_not_exists', 404);

        // Delete Ticket Type
        await this.ticketTypesRepo.delete(ticketType.id);
        return;
    }
}
