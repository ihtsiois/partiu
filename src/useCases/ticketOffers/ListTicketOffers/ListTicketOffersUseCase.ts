import { ITicketTypesRepository } from '@/repositories/ITicketTypesRepository';
import { ITicketOffersRepository } from '@/repositories/ITicketOffersRepository';

export class ListTicketOffersUseCase {
    constructor(
        private ticketTypesRepo: ITicketTypesRepository,
        private ticketOffersRepo: ITicketOffersRepository,
    ) {}

    async execute(ticket_type_id: string) {
        // Get Ticket Type
        const ticketType = await this.ticketTypesRepo.findByID(ticket_type_id);
        if (!ticketType) throw new Error('Ticket Type not exists');

        // Get Ticket Offers
        const ticketOffers = await this.ticketOffersRepo.listByType(ticketType.id);
        return ticketOffers;
    }
}
