import { ITicketOffersRepository } from '@/repositories/ITicketOffersRepository';
import { UpdateTicketOfferRequestDTO } from './UpdateTicketOfferDTO';
import { TicketOffer } from '@/entities/TicketOffer';

export class UpdateTicketOfferUseCase {
    constructor(private ticketOffersRepo: ITicketOffersRepository) {}

    async handle(id: string, data: UpdateTicketOfferRequestDTO) {
        // Get Ticket Offer
        const ticketOffer = await this.ticketOffersRepo.findByID(id);
        if (!ticketOffer) throw new Error('Ticket Offer not exists');

        // Update Ticket Offer
        const newTicketOffer = new TicketOffer({ ...ticketOffer, ...data }, id);
        await this.ticketOffersRepo.save(newTicketOffer);

        return newTicketOffer;
    }
}
