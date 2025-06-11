import { ITicketTypesRepository } from '@/repositories/ITicketTypesRepository';

export class DeleteTicketTypeUseCase {
    constructor(private ticketTypesRepo: ITicketTypesRepository) {}

    async execute(id: string) {
        // Get Ticket Type
        const ticketType = await this.ticketTypesRepo.findByID(id);
        if (!ticketType) throw new Error('Ticket Type not exists');

        // Delete Ticket Type
        await this.ticketTypesRepo.delete(ticketType.id);
        return;
    }
}
