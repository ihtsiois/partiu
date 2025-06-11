import { IEventsRepository } from '@/repositories/IEventsRepository';
import { ITicketModalitiesRepository } from '@/repositories/ITicketModalitiesRepository';

export class ListTicketModalitiesUseCase {
    constructor(
        private eventsRepo: IEventsRepository,
        private ticketModalitiesRepo: ITicketModalitiesRepository,
    ) {}

    async execute(event_id: string) {
        // Get Event
        const event = await this.eventsRepo.findByID(event_id);
        if (!event) throw new Error('Event not exists');

        // Get Ticket Modalities
        const ticketModalities = await this.ticketModalitiesRepo.listByEvent(event.id);
        return ticketModalities;
    }
}
