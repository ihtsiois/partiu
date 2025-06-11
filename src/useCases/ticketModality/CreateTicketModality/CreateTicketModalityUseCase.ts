import { IEventsRepository } from '@/repositories/IEventsRepository';
import { ITicketModalitiesRepository } from '@/repositories/ITicketModalitiesRepository';
import { CreateTicketModalityRequestDTO } from './CreateTicketModalityDTO';
import { TicketModality } from '@/entities/TicketModality';

export class CreateTicketModalityUseCase {
    constructor(
        private eventsRepo: IEventsRepository,
        private ticketModalitiesRepo: ITicketModalitiesRepository,
    ) {}

    async execute(event_id: string, data: CreateTicketModalityRequestDTO) {
        // Get Event
        const event = await this.eventsRepo.findByID(event_id);
        if (!event) throw new Error('Event not exists');

        // Create Ticket Modality
        const ticketModality = new TicketModality({ event_id, ...data });
        await this.ticketModalitiesRepo.save(ticketModality);

        return ticketModality;
    }
}
