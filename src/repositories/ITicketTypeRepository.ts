import { TicketType } from '@/entities/TicketType';

export interface ITicketTypeRepository {
    listByEvent(event_id: string): Promise<TicketType[]>;
    findByID(id: string): Promise<TicketType | null>;
    save(ticket_type: TicketType): Promise<void>;
    delete(id: string): Promise<void>;
}
