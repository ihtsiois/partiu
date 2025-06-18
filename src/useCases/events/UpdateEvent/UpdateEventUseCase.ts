import { Event } from '@/entities/Event';
import { User } from '@/entities/User';
import { AppError } from '@/plugins/errorHandler';
import { IEventsRepository } from '@/repositories/IEventsRepository';
import { UpdateEventRequestDTO } from '@/useCases/events';

export class UpdateEventUseCase {
    constructor(private eventsRepo: IEventsRepository) {}

    async execute(id: string, data: UpdateEventRequestDTO, user: User): Promise<Event> {
        // Get Event
        const event = await this.eventsRepo.findById(id);
        if (!event) throw new AppError('event_not_exists', 404);
        // Validate Event Ownership
        if (event.owner_id !== user.id) throw new AppError('event_not_exists', 404);

        // Create New Event Entitie
        const newEvent = new Event({ ...event, ...data }, event.id);

        // Validate Start Date
        if (newEvent.start_date >= newEvent.end_date) throw new AppError('event_invalid_dates', 400);

        // Validate Sales Start & End Date
        if (newEvent.sales_starts_at >= newEvent.sales_ends_at) throw new AppError('event_invalid_dates', 400);
        if (newEvent.sales_ends_at > newEvent.end_date) throw new AppError('event_invalid_dates', 400);

        // Update Event
        await this.eventsRepo.save(newEvent);
        return newEvent;
    }
}
