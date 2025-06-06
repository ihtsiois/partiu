import { IEventsRepository } from '@/repositories/IEventsRepository';
import { Event } from '@/entities/Event';
import { CreateEventRequestDTO } from '@/useCases/events';

export class CreateEventUseCase {
    constructor(private eventsRepo: IEventsRepository) {}

    async execute(data: CreateEventRequestDTO): Promise<Event> {
        const { start_date, end_date, sales_starts_at, sales_ends_at } = data;

        // Validate Start Date
        if (start_date >= end_date) throw new Error('The event must start before the end date.');

        // Validate Sales Start & End Date
        if (sales_starts_at >= sales_ends_at) throw new Error('The event sales must start before the sales end date.');
        if (sales_ends_at > end_date) throw new Error('The event sales must end before the end date.');

        // Create Event
        const event = new Event({ ...data, owner_id: 'root' });
        await this.eventsRepo.save(event);
        return event;
    }
}
