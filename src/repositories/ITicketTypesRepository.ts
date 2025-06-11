import { TicketType } from '@/entities/TicketType';

export interface ITicketTypesRepository {
    listByEvent(event_id: string): Promise<TicketType[]>;
    findByID(id: string): Promise<TicketType | null>;
    save(ticket_type: TicketType): Promise<void>;
    delete(id: string): Promise<void>;
}
