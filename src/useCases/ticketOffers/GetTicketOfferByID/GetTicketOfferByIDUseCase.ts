import { User } from '@/entities/User';
import { AppError } from '@/plugins/errorHandler';
import { ITicketOffersRepository } from '@/repositories/ITicketOffersRepository';

export class GetTicketOfferByIDUseCase {
    constructor(private ticketOffersRepo: ITicketOffersRepository) {}

    async execute(ticket_offer_id: string, user: User) {
        // Get Ticket Offer
        const ticketOffer = await this.ticketOffersRepo.findById(ticket_offer_id);
        if (!ticketOffer) throw new AppError('ticket_offer_not_exists', 404);

        // Validate Ownership
        const owner = await this.ticketOffersRepo.getOwnership(ticketOffer.id);
        if (!owner || owner.id !== user.id) throw new AppError('ticket_offer_not_exists', 404);

        return ticketOffer;
    }
}
