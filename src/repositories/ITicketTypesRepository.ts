import { TicketType } from '@/entities/TicketType';
import { User } from '@/entities/User';

export interface ITicketTypesRepository {
    listByEvent(event_id: string): Promise<TicketType[]>;
    findById(id: string): Promise<TicketType | null>;
    save(ticket_type: TicketType): Promise<void>;
    delete(id: string): Promise<void>;
    getOwnership(id: string): Promise<User | null>;
}
