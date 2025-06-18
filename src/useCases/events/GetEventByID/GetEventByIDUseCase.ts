import { IEventsRepository } from '@/repositories/IEventsRepository';
import { Event } from '@/entities/Event';
import { AppError } from '@/plugins/errorHandler';
import { User } from '@/entities/User';

export class GetEventByIDUseCase {
    constructor(private eventsRepo: IEventsRepository) {}

    async execute(id: string, user: User): Promise<Event> {
        // Get Event
        const event = await this.eventsRepo.findById(id);
        if (!event) throw new AppError('event_not_exists', 404);

        // Validate Event Ownership
        if (event.owner_id !== user.id) throw new AppError('event_not_exists', 404);

        return event;
    }
}
