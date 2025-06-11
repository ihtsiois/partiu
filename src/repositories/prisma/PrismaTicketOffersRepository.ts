import { PrismaClient } from '@/generated/prisma';
import { ITicketOffersRepository } from '@/repositories/ITicketOffersRepository';
import { TicketOffer } from '@/entities/TicketOffer';

export class PrismaTicketOffersRepository implements ITicketOffersRepository {
    private db: PrismaClient;

    constructor() {
        this.db = new PrismaClient();
    }

    async listByType(ticket_type_id: string): Promise<TicketOffer[]> {
        const ticketOffers = await this.db.ticketOffer.findMany({ where: { ticket_type_id } });
        return ticketOffers.map((t) => new TicketOffer(t, t.id));
    }

    async findByID(id: string): Promise<TicketOffer | null> {
        const ticketOffer = await this.db.ticketOffer.findUnique({ where: { id } });
        if (!ticketOffer) return null;
        else return new TicketOffer(ticketOffer, ticketOffer.id);
    }

    async save(ticketOffer: TicketOffer): Promise<void> {
        await this.db.ticketOffer.upsert({
            where: { id: ticketOffer.id },
            create: ticketOffer,
            update: ticketOffer,
        });
        return;
    }

    async delete(id: string): Promise<void> {
        await this.db.ticketOffer.delete({ where: { id } });
        return;
    }
}
