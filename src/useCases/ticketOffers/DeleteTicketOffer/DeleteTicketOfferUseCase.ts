import { AppError } from '@/plugins/errorHandler';
import { ITicketOffersRepository } from '@/repositories/ITicketOffersRepository';

export class DeleteTicketOfferUseCase {
    constructor(private ticketOffersRepo: ITicketOffersRepository) {}

    async execute(id: string) {
        // Get Ticket Offer
        const ticketOffer = await this.ticketOffersRepo.findByID(id);
        if (!ticketOffer) throw new AppError('ticket_offer_not_exists', 404);

        // Delete Ticket Offer
        await this.ticketOffersRepo.delete(ticketOffer.id);

        return;
    }
}
