import { Event } from '@/entities/Event';
import { StoreEvent, StoreEventData } from '@/entities/StoreEvent';
import { IEventsRepository } from '@/repositories/IEventsRepository';

interface FeedSection {
    title: string;
    data: StoreEventData[];
}

export class GetFeedUseCase {
    constructor(private eventsRepo: IEventsRepository) {}

    async execute() {
        const feed: FeedSection[] = [];

        // Get upcoming events
        const upcoming = await this.eventsRepo.listUpcoming();
        if (upcoming.length > 0) {
            const storeEvents = upcoming.map((event) => StoreEvent.fromEvent(event));
            feed.push({ title: 'Nos próximos dias', data: storeEvents.map((se) => se.data) });
        }

        return feed;
    }
}
