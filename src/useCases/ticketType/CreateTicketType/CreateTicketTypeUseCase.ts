import { CreateTicketTypeRequestDTO } from '@/useCases/ticketType/CreateTicketType/CreateTicketTypeDTO';
import { TicketType } from '@/entities/TicketType';
import { ITicketTypesRepository } from '@/repositories/ITicketTypesRepository';
import { IEventsRepository } from '@/repositories/IEventsRepository';

export class CreateTicketTypeUseCase {
    constructor(
        private eventsRepo: IEventsRepository,
        private ticketTypesRepo: ITicketTypesRepository,
    ) {}

    async execute(event_id: string, data: CreateTicketTypeRequestDTO) {
        // Get Event
        const event = await this.eventsRepo.findByID(event_id);
        if (!event) throw new Error('Event not exists');

        // Save Ticket Type
        const ticketType = new TicketType({ ...data, event_id: event.id });
        await this.ticketTypesRepo.save(ticketType);
        return ticketType;
    }
}
