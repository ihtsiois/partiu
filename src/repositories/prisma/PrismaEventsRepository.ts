import { PrismaClient } from '@/generated/prisma';
import { Event } from '@/entities/Event';
import { IEventsRepository } from '@/repositories/IEventsRepository';

export class PrismaEventsRepository implements IEventsRepository {
    private db: PrismaClient;

    constructor() {
        this.db = new PrismaClient();
    }

    async list(): Promise<Event[]> {
        const events = await this.db.event.findMany();
        return events.map((e) => new Event(e, e.id));
    }

    async listUpcoming(limit: number = 10): Promise<Event[]> {
        const now = new Date();
        const in30Days = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        const events = await this.db.event.findMany({
            where: {
                start_date: {
                    gte: now,
                    lte: in30Days,
                },
            },
            orderBy: {
                start_date: 'asc',
            },
            take: limit,
        });

        return events.map((e) => new Event(e));
    }

    async findById(id: string): Promise<Event | null> {
        const event = await this.db.event.findUnique({ where: { id } });
        if (!event) return null;
        else return new Event(event, event.id);
    }

    async findBySlug(slug: string): Promise<Event | null> {
        const event = await this.db.event.findUnique({ where: { slug } });
        if (!event) return null;
        else return new Event(event, event.id);
    }

    async save(event: Event): Promise<void> {
        await this.db.event.upsert({
            where: { id: event.id },
            update: event,
            create: event,
        });
        return;
    }

    async delete(id: string): Promise<void> {
        await this.db.event.delete({ where: { id: id } });
        return;
    }
}
