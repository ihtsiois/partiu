import { TicketModality } from '@/entities/TicketModality';
import { ITicketModalitiesRepository } from '@/repositories/ITicketModalitiesRepository';
import { UpdateTicketTypeRequestDTO } from '@/useCases/ticketType';

export class UpdateTicketModalityUseCase {
    constructor(private ticketModalitiesRepo: ITicketModalitiesRepository) {}

    async execute(id: string, data: UpdateTicketTypeRequestDTO) {
        // Get Ticket Modality
        const ticketModality = await this.ticketModalitiesRepo.findByID(id);
        if (!ticketModality) throw new Error('Tiket Modality not exists');

        // Update Ticket Modality
        const newTicketModality = new TicketModality({ ...ticketModality, ...data }, ticketModality.id);
        await this.ticketModalitiesRepo.save(newTicketModality);

        return newTicketModality;
    }
}
