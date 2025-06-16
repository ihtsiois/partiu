import { IEventsRepository } from '@/repositories/IEventsRepository';
import { Event } from '@/entities/Event';
import { CreateEventRequestDTO } from '@/useCases/events';
import { AppError } from '@/plugins/errorHandler';

export class CreateEventUseCase {
    constructor(private eventsRepo: IEventsRepository) {}

    async execute(data: CreateEventRequestDTO): Promise<Event> {
        const { start_date, end_date, sales_starts_at, sales_ends_at } = data;

        // Validate Start Date
        if (start_date >= end_date) throw new AppError('event_invalid_dates', 400);

        // Validate Sales Start & End Date
        if (sales_starts_at >= sales_ends_at) throw new AppError('invalid_dates', 400);
        if (sales_ends_at > end_date) throw new AppError('event_invalid_dates', 400);

        // Create Event
        const event = new Event({ ...data, owner_id: 'root' });
        await this.eventsRepo.save(event);
        return event;
    }
}
