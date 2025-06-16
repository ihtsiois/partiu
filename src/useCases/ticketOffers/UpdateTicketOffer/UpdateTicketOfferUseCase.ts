import { ITicketOffersRepository } from '@/repositories/ITicketOffersRepository';
import { UpdateTicketOfferRequestDTO } from './UpdateTicketOfferDTO';
import { TicketOffer } from '@/entities/TicketOffer';
import { AppError } from '@/plugins/errorHandler';

export class UpdateTicketOfferUseCase {
    constructor(private ticketOffersRepo: ITicketOffersRepository) {}

    async handle(id: string, data: UpdateTicketOfferRequestDTO) {
        // Get Ticket Offer
        const ticketOffer = await this.ticketOffersRepo.findByID(id);
        if (!ticketOffer) throw new AppError('ticket_offer_not_exists', 404);

        // Update Ticket Offer
        const newTicketOffer = new TicketOffer({ ...ticketOffer, ...data }, id);
        await this.ticketOffersRepo.save(newTicketOffer);

        return newTicketOffer;
    }
}
