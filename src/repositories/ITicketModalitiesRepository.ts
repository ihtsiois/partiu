import { TicketModality } from '@/entities/TicketModality';

export interface ITicketModalitiesRepository {
    listByEvent(event_id: string): Promise<TicketModality[]>;
    findByID(id: string): Promise<TicketModality | null>;
    save(ticketModality: TicketModality): Promise<void>;
    delete(id: string): Promise<void>;
}
