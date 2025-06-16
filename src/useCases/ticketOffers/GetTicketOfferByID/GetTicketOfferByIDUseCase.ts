import { AppError } from '@/plugins/errorHandler';
import { ITicketOffersRepository } from '@/repositories/ITicketOffersRepository';

export class GetTicketOfferByIDUseCase {
    constructor(private ticketOffersRepo: ITicketOffersRepository) {}

    async execute(ticket_offer_id: string) {
        // Get Ticket Offer
        const ticketOffer = this.ticketOffersRepo.findByID(ticket_offer_id);
        if (!ticketOffer) throw new AppError('ticket_offer_not_exists', 404);

        return ticketOffer;
    }
}
