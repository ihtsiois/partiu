import { ITicketModalitiesRepository } from '@/repositories/ITicketModalitiesRepository';
import { PrismaClient } from '@/generated/prisma';
import { TicketModality } from '@/entities/TicketModality';

export class PrismaTicketModalitiesRepository implements ITicketModalitiesRepository {
    private db: PrismaClient;

    constructor() {
        this.db = new PrismaClient();
    }

    async listByEvent(event_id: string): Promise<TicketModality[]> {
        const ticketModalities = await this.db.ticketModality.findMany({ where: { event_id } });
        return ticketModalities.map((t) => new TicketModality(t, t.id));
    }

    async findByID(id: string): Promise<TicketModality | null> {
        const ticketModality = await this.db.ticketModality.findUnique({ where: { id } });
        if (!ticketModality) return null;
        else return new TicketModality(ticketModality, ticketModality.id);
    }

    async save(ticketModality: TicketModality): Promise<void> {
        await this.db.ticketModality.upsert({
            where: { id: ticketModality.id },
            create: ticketModality,
            update: ticketModality,
        });
        return;
    }

    async delete(id: string): Promise<void> {
        await this.db.ticketModality.delete({ where: { id } });
        return;
    }
}
