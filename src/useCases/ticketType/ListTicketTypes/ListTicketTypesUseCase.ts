import { ITicketTypesRepository } from '@/repositories/ITicketTypesRepository';
import { IEventsRepository } from '@/repositories/IEventsRepository';

export class ListTicketTypesUseCase {
    constructor(
        private eventsRepo: IEventsRepository,
        private ticketTypesRepo: ITicketTypesRepository,
    ) {}

    async execute(event_id: string) {
        // Get Event
        const event = await this.eventsRepo.findByID(event_id);
        if (!event) throw new Error('Event not Exists');

        // Get Ticket Types
        return await this.ticketTypesRepo.listByEvent(event.id);
    }
}
