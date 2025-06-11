import { TicketOffer } from '@/entities/TicketOffer';

export interface ITicketOffersRepository {
    listByType(ticket_type_id: string): Promise<TicketOffer[]>;
    findByID(id: string): Promise<TicketOffer | null>;
    save(ticket_modality: TicketOffer): Promise<void>;
    delete(id: string): Promise<void>;
}
