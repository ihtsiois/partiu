import { ITicketTypesRepository } from '@/repositories/ITicketTypesRepository';
import { UpdateTicketTypeRequestDTO } from './UpdateTicketTypeDTO';
import { TicketType } from '@/entities/TicketType';

export class UpdateTicketTypeUseCase {
    constructor(private ticketTypesRepo: ITicketTypesRepository) {}

    async execute(id: string, data: UpdateTicketTypeRequestDTO) {
        // Get Ticket Type
        const ticketType = await this.ticketTypesRepo.findByID(id);
        if (!ticketType) throw new Error('Ticket Type not exists');

        // Update Ticket Type
        const newTicketType = new TicketType({ ...ticketType, ...data }, ticketType.id);
        await this.ticketTypesRepo.save(newTicketType);
        return newTicketType;
    }
}
