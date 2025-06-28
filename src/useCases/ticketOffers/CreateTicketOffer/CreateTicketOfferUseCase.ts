import { ITicketOffersRepository } from '@/repositories/ITicketOffersRepository';
import { CreateTicketOfferRequestDTO } from './CreateTicketOfferDTO';
import { ITicketTypesRepository } from '@/repositories/ITicketTypesRepository';
import { TicketOffer } from '@/entities/TicketOffer';
import { AppError } from '@/plugins/errorHandler';
import { User } from '@/entities/User';

export class CreateTicketOfferUseCase {
    constructor(
        private ticketTypesRepo: ITicketTypesRepository,
        private ticketOffersRepo: ITicketOffersRepository,
    ) {}

    async execute(ticket_type_id: string, data: CreateTicketOfferRequestDTO, user: User) {
        // Get Ticket Type
        const ticketType = await this.ticketTypesRepo.findById(ticket_type_id);
        if (!ticketType) throw new AppError('ticket_type_not_exists', 404);

        // Validate Ownership
        const owner = await this.ticketTypesRepo.getOwnership(ticketType.id);
        if (!owner || owner.id !== user.id) throw new AppError('ticket_type_not_exists', 404);

        // Create Ticket Offer
        const ticketOffer = new TicketOffer({
            ticket_type_id: ticketType.id,
            title: data.title,
            description: data.description,
            price: data.price,
            quantity: data.quantity,
        });
        await this.ticketOffersRepo.save(ticketOffer);

        return ticketOffer;
    }
}
