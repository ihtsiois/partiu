import { ITicketOffersRepository } from '@/repositories/ITicketOffersRepository';
import { CreateTicketOfferRequestDTO } from './CreateTicketOfferDTO';
import { IEventsRepository } from '@/repositories/IEventsRepository';
import { ITicketTypesRepository } from '@/repositories/ITicketTypesRepository';
import { TicketOffer } from '@/entities/TicketOffer';

export class CreateTicketOfferUseCase {
    constructor(
        private ticketTypesRepo: ITicketTypesRepository,
        private ticketOffersRepo: ITicketOffersRepository,
    ) {}

    async execute(ticket_type_id: string, data: CreateTicketOfferRequestDTO) {
        // Get Ticket Type
        const ticketType = await this.ticketTypesRepo.findByID(ticket_type_id);
        if (!ticketType) throw new Error('Ticket Type not exists');

        // Create Ticket Offer
        const ticketOffer = new TicketOffer({
            ticket_type_id: ticketType.id,
            title: data.title,
            description: data.description,
        });
        await this.ticketOffersRepo.save(ticketOffer);

        return ticketOffer;
    }
}
