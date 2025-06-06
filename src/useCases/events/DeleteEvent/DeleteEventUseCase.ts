import { IEventsRepository } from '@/repositories/IEventsRepository';

export class DeleteEventUseCase {
    constructor(private eventsRepo: IEventsRepository) {}

    async execute(id: string): Promise<void> {
        // Get Event
        const event = await this.eventsRepo.findByID(id);
        if (!event) throw new Error('Event not exists');

        // Delete Event
        await this.eventsRepo.delete(event.id);
        return;
    }
}
