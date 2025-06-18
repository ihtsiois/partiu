import { ITicketTypesRepository } from '@/repositories/ITicketTypesRepository';
import { ITicketOffersRepository } from '@/repositories/ITicketOffersRepository';
import { AppError } from '@/plugins/errorHandler';

export class ListTicketOffersUseCase {
    constructor(
        private ticketTypesRepo: ITicketTypesRepository,
        private ticketOffersRepo: ITicketOffersRepository,
    ) {}

    async execute(ticket_type_id: string) {
        // Get Ticket Type
        const ticketType = await this.ticketTypesRepo.findById(ticket_type_id);
        if (!ticketType) throw new AppError('ticket_type_not_exists', 404);

        // Get Ticket Offers
        const ticketOffers = await this.ticketOffersRepo.listByType(ticketType.id);
        return ticketOffers;
    }
}
