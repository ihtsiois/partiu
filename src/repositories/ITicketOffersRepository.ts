import { TicketOffer } from '@/entities/TicketOffer';
import { User } from '@/entities/User';

export interface ITicketOffersRepository {
    listByType(ticket_type_id: string): Promise<TicketOffer[]>;
    findById(id: string): Promise<TicketOffer | null>;
    save(ticket_modality: TicketOffer): Promise<void>;
    delete(id: string): Promise<void>;
    getOwnership(id: string): Promise<User | null>;
}
