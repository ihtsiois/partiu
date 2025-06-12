import { ITicketOffersRepository } from '@/repositories/ITicketOffersRepository';

export class GetTicketOfferByIDUseCase {
    constructor(private ticketOffersRepo: ITicketOffersRepository) {}

    async execute(ticket_offer_id: string) {
        // Get Ticket Offer
        const ticketOffer = this.ticketOffersRepo.findByID(ticket_offer_id);
        if (!ticketOffer) throw new Error('Ticket Offer not exists');

        return ticketOffer;
    }
}
