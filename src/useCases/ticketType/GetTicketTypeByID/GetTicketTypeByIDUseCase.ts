import { ITicketTypesRepository } from '@/repositories/ITicketTypesRepository';

export class GetTicketTypeByIDUseCase {
    constructor(private ticketTypesRepo: ITicketTypesRepository) {}

    async execute(id: string) {
        // Get Ticket Type
        const ticketType = await this.ticketTypesRepo.findByID(id);
        if (!ticketType) throw new Error('Ticket Type not exists');

        return ticketType;
    }
}
