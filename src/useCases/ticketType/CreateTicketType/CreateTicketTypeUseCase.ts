import { CreateTicketTypeRequestDTO } from '@/useCases/ticketType/CreateTicketType/CreateTicketTypeDTO';
import { TicketType } from '@/entities/TicketType';
import { ITicketTypesRepository } from '@/repositories/ITicketTypesRepository';
import { IEventsRepository } from '@/repositories/IEventsRepository';
import { AppError } from '@/plugins/errorHandler';

export class CreateTicketTypeUseCase {
    constructor(
        private eventsRepo: IEventsRepository,
        private ticketTypesRepo: ITicketTypesRepository,
    ) {}

    async execute(event_id: string, data: CreateTicketTypeRequestDTO) {
        // Get Event
        const event = await this.eventsRepo.findById(event_id);
        if (!event) throw new AppError('event_not_exists', 404);

        // Save Ticket Type
        const ticketType = new TicketType({ ...data, event_id: event.id });
        await this.ticketTypesRepo.save(ticketType);
        return ticketType;
    }
}
