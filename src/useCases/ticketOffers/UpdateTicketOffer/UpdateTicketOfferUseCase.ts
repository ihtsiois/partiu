import { ITicketOffersRepository } from '@/repositories/ITicketOffersRepository';
import { UpdateTicketOfferRequestDTO } from './UpdateTicketOfferDTO';
import { TicketOffer } from '@/entities/TicketOffer';
import { AppError } from '@/plugins/errorHandler';
import { User } from '@/entities/User';

export class UpdateTicketOfferUseCase {
    constructor(private ticketOffersRepo: ITicketOffersRepository) {}

    async handle(id: string, data: UpdateTicketOfferRequestDTO, user: User) {
        // Get Ticket Offer
        const ticketOffer = await this.ticketOffersRepo.findById(id);
        if (!ticketOffer) throw new AppError('ticket_offer_not_exists', 404);

        // Validate Ownership
        const owner = await this.ticketOffersRepo.getOwnership(ticketOffer.id);
        if (!owner || owner.id !== user.id) throw new AppError('ticket_offer_not_exists', 404);

        // Update Ticket Offer
        const newTicketOffer = new TicketOffer({ ...ticketOffer, ...data }, id);
        await this.ticketOffersRepo.save(newTicketOffer);

        return newTicketOffer;
    }
}
