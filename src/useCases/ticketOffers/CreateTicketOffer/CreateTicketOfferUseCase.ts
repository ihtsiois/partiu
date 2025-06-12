import { ITicketOffersRepository } from '@/repositories/ITicketOffersRepository';
import { CreateTicketOfferRequestDTO } from './CreateTicketOfferDTO';
import { IEventsRepository } from '@/repositories/IEventsRepository';
import { ITicketTypesRepository } from '@/repositories/ITicketTypesRepository';
import { TicketOffer } from '@/entities/TicketOffer';

export class CreateTicketOfferUseCase {
    constructor(
        private eventsRepo: IEventsRepository,
        private ticketTypesRepo: ITicketTypesRepository,
        private ticketOffersRepo: ITicketOffersRepository,
    ) {}

    async execute(event_id: string, data: CreateTicketOfferRequestDTO) {
        // Get Event
        const event = await this.eventsRepo.findByID(event_id);
        if (!event) throw new Error('Event not exists');

        // Get Ticket Type
        const ticketType = await this.ticketTypesRepo.findByID(data.ticket_type_id);
        if (!ticketType || ticketType.event_id !== event.id) throw new Error('Ticket Type not exists');

        // Create Ticket Offer
        const ticketOffer = new TicketOffer({
            ticket_type_id: data.ticket_type_id,
            title: data.title,
            description: data.description,
        });
        await this.ticketOffersRepo.save(ticketOffer);

        return ticketOffer;
    }
}
