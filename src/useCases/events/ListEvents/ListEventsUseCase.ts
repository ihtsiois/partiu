import { IEventsRepository } from '@/repositories/IEventsRepository';
import { Event } from '@/entities/Event';

export class ListEventsUseCase {
    constructor(private eventsRepo: IEventsRepository) {}

    async execute(): Promise<Event[]> {
        return await this.eventsRepo.list();
    }
}