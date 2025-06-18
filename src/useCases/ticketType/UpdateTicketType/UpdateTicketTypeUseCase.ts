import { ITicketTypesRepository } from '@/repositories/ITicketTypesRepository';
import { UpdateTicketTypeRequestDTO } from './UpdateTicketTypeDTO';
import { TicketType } from '@/entities/TicketType';
import { AppError } from '@/plugins/errorHandler';
import { User } from '@/entities/User';

export class UpdateTicketTypeUseCase {
    constructor(private ticketTypesRepo: ITicketTypesRepository) {}

    async execute(id: string, data: UpdateTicketTypeRequestDTO, user: User) {
        // Get Ticket Type
        const ticketType = await this.ticketTypesRepo.findById(id);
        if (!ticketType) throw new AppError('ticket_type_not_exists', 404);

        // Validate Ownership
        const owner = await this.ticketTypesRepo.getOwnership(ticketType.id);
        if (!owner || owner.id !== user.id) throw new AppError('ticket_type_not_exists', 404);

        // Update Ticket Type
        const newTicketType = new TicketType({ ...ticketType, ...data }, ticketType.id);
        await this.ticketTypesRepo.save(newTicketType);
        return newTicketType;
    }
}
