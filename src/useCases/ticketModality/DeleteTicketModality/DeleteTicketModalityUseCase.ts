import { ITicketModalitiesRepository } from '@/repositories/ITicketModalitiesRepository';

export class DeleteTickeModalityUseCase {
    constructor(private ticketModalitiesRepo: ITicketModalitiesRepository) {}

    async execute(id: string) {
        // Get Ticket Modality
        const ticketModality = await this.ticketModalitiesRepo.findByID(id);
        if (!ticketModality) throw new Error('Ticket modality not exists');

        // Delete Ticket Modality
        await this.ticketModalitiesRepo.delete(ticketModality.id);
        return;
    }
}
