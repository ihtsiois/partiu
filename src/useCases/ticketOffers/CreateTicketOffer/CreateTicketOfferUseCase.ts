import { ITicketOffersRepository } from '@/repositories/ITicketOffersRepository';
import { CreateTicketOfferRequestDTO } from './CreateTicketOfferDTO';
import { IEventsRepository } from '@/repositories/IEventsRepository';
import { ITicketTypesRepository } from '@/repositories/ITicketTypesRepository';
import { ITicketModalitiesRepository } from '@/repositories/ITicketModalitiesRepository';
import { TicketOffer } from '@/entities/TicketOffer';

export class CreateTicketOfferUseCase {
    constructor(
        private eventsRepo: IEventsRepository,
        private ticketTypesRepo: ITicketTypesRepository,
        private ticketModalitiesRepo: ITicketModalitiesRepository,
        private ticketOffersRepo: ITicketOffersRepository,
    ) {}

    async execute(event_id: string, data: CreateTicketOfferRequestDTO) {
        // Get Event
        const event = await this.eventsRepo.findByID(event_id);
        if (!event) throw new Error('Event not exists');

        // Get Ticket Type
        const ticketType = await this.ticketTypesRepo.findByID(data.ticket_type_id);
        if (!ticketType || ticketType.event_id !== event.id) throw new Error('Ticket Type not exists');

        // Get Ticket Modality
        const ticketModality = await this.ticketModalitiesRepo.findByID(data.modality_id);
        if (!ticketModality || ticketModality.event_id !== event.id) throw new Error('Ticket Modality not exists');

        // Create Ticket Offer
        const ticketOffer = new TicketOffer({
            ticket_type_id: data.ticket_type_id,
            modality_id: data.modality_id,
        });
        await this.ticketOffersRepo.save(ticketOffer);

        return ticketOffer;
    }
}
