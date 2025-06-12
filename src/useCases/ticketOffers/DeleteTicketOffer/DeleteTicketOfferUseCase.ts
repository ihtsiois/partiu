import { ITicketOffersRepository } from '@/repositories/ITicketOffersRepository';

export class DeleteTicketOfferUseCase {
    constructor(private ticketOffersRepo: ITicketOffersRepository) {}

    async execute(id: string) {
        // Get Ticket Offer
        const ticketOffer = await this.ticketOffersRepo.findByID(id);
        if (!ticketOffer) throw new Error('Ticket Offer not exists');

        // Delete Ticket Offer
        await this.ticketOffersRepo.delete(ticketOffer.id);

        return;
    }
}
