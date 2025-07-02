import { Event } from '@/entities/Event';
import { IEventsRepository } from '@/repositories/IEventsRepository';

interface FeedSection {
    title: string;
    data: Event[];
}

export class GetFeedUseCase {
    constructor(private eventsRepo: IEventsRepository) {}

    async execute() {
        const feed: FeedSection[] = [];

        // Get upcoming events
        const upcoming = await this.eventsRepo.listUpcoming();
        if (upcoming.length > 0) feed.push({ title: 'Nos próximos dias', data: upcoming });

        return feed;
    }
}
