import { IEventsRepository } from '@/repositories/IEventsRepository';
import { Event } from '@/entities/Event';

export class GetEventByIDUseCase {
    constructor(private eventsRepo: IEventsRepository) {}

    async execute(id: string): Promise<Event> {
        const event = await this.eventsRepo.findByID(id);
        if (!event) throw new Error('Event not exists');
        return event;
    }
}
