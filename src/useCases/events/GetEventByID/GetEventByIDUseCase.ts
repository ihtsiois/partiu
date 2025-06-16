import { IEventsRepository } from '@/repositories/IEventsRepository';
import { Event } from '@/entities/Event';
import { AppError } from '@/plugins/errorHandler';

export class GetEventByIDUseCase {
    constructor(private eventsRepo: IEventsRepository) {}

    async execute(id: string): Promise<Event> {
        const event = await this.eventsRepo.findByID(id);
        if (!event) throw new AppError('event_not_exists', 404);
        return event;
    }
}
