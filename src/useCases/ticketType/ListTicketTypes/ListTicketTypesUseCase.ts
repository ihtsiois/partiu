import { ITicketTypesRepository } from '@/repositories/ITicketTypesRepository';
import { IEventsRepository } from '@/repositories/IEventsRepository';
import { AppError } from '@/plugins/errorHandler';

export class ListTicketTypesUseCase {
    constructor(
        private eventsRepo: IEventsRepository,
        private ticketTypesRepo: ITicketTypesRepository,
    ) {}

    async execute(event_id: string) {
        // Get Event
        const event = await this.eventsRepo.findByID(event_id);
        if (!event) throw new AppError('event_not_exists', 404);

        // Get Ticket Types
        return await this.ticketTypesRepo.listByEvent(event.id);
    }
}
