import { User } from '@/entities/User';
import { AppError } from '@/plugins/errorHandler';
import { IEventsRepository } from '@/repositories/IEventsRepository';

export class DeleteEventUseCase {
    constructor(private eventsRepo: IEventsRepository) {}

    async execute(id: string, user: User): Promise<void> {
        // Get Event
        const event = await this.eventsRepo.findById(id);
        if (!event) throw new AppError('event_not_exists', 404);

        // Validate Event Ownership
        if (event.owner_id !== user.id) throw new AppError('event_not_exists', 404);

        // Delete Event
        await this.eventsRepo.delete(event.id);
        return;
    }
}
