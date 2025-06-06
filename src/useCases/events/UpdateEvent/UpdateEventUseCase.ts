import { Event } from '@/entities/Event';
import { IEventsRepository } from '@/repositories/IEventsRepository';
import { UpdateEventRequestDTO } from '@/useCases/events';

export class UpdateEventUseCase {
    constructor(private eventsRepo: IEventsRepository) {}

    async execute(id: string, data: UpdateEventRequestDTO): Promise<Event> {
        // Get Event
        const event = await this.eventsRepo.findByID(id);
        if (!event) throw new Error('Event not exists');
        const newEvent = new Event({ ...event, ...data }, event.id);

        // Validate Start Date
        if (newEvent.start_date >= newEvent.end_date) throw new Error('The event must start before the end date.');

        // Validate Sales Start & End Date
        if (newEvent.sales_starts_at >= newEvent.sales_ends_at)
            throw new Error('The event sales must start before the sales end date.');
        if (newEvent.sales_ends_at > newEvent.end_date)
            throw new Error('The event sales must end before the end date.');

        // Update Event
        await this.eventsRepo.save(newEvent);
        return newEvent;
    }
}
