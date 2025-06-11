import { ITicketModalitiesRepository } from '@/repositories/ITicketModalitiesRepository';

export class GetTicketModalityByIDUseCase {
    constructor(private ticketModalitiesRepo: ITicketModalitiesRepository) {}

    async execute(id: string) {
        // Get Ticket Modality
        const ticketModality = await this.ticketModalitiesRepo.findByID(id);
        if (!ticketModality) throw new Error('Ticket Modality not exits');

        return ticketModality;
    }
}
