import { ITicketTypesRepository } from '@/repositories/ITicketTypesRepository';
import { TicketType } from '@/entities/TicketType';
import { PrismaClient } from '@/generated/prisma';
import { User } from '@/entities/User';

export class PrismaTicketTypesRepository implements ITicketTypesRepository {
    private db: PrismaClient;

    constructor() {
        this.db = new PrismaClient();
    }

    async listByEvent(event_id: string): Promise<TicketType[]> {
        const ticketTypes = await this.db.ticketType.findMany({ where: { event_id } });
        return ticketTypes.map((t) => new TicketType(t, t.id));
    }

    async findById(id: string): Promise<TicketType | null> {
        const ticketType = await this.db.ticketType.findUnique({ where: { id } });
        if (!ticketType) return null;
        else return new TicketType(ticketType, ticketType.id);
    }

    async save(ticketType: TicketType): Promise<void> {
        await this.db.ticketType.upsert({
            where: { id: ticketType.id },
            create: ticketType,
            update: ticketType,
        });
        return;
    }

    async delete(id: string): Promise<void> {
        await this.db.ticketType.delete({ where: { id } });
        return;
    }

    async getOwnership(id: string): Promise<User | null> {
        const ticketType = await this.db.ticketType.findUnique({
            where: { id },
            include: {
                event: {
                    select: { owner: true },
                },
            },
        });

        if (!ticketType) return null;
        else {
            const user = ticketType.event.owner;
            return new User(user, user.id);
        }
    }
}
