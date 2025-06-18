import { CreateTicketTypeRequestDTO } from '@/useCases/ticketType/CreateTicketType/CreateTicketTypeDTO';
import { TicketType } from '@/entities/TicketType';
import { ITicketTypesRepository } from '@/repositories/ITicketTypesRepository';
import { IEventsRepository } from '@/repositories/IEventsRepository';
import { AppError } from '@/plugins/errorHandler';
import { User } from '@/entities/User';

export class CreateTicketTypeUseCase {
    constructor(
        private eventsRepo: IEventsRepository,
        private ticketTypesRepo: ITicketTypesRepository,
    ) {}

    async execute(event_id: string, data: CreateTicketTypeRequestDTO, user: User) {
        // Get Event
        const event = await this.eventsRepo.findById(event_id);
        if (!event) throw new AppError('event_not_exists', 404);

        // Validate Ownership
        if (event.owner_id !== user.id) throw new AppError('event_not_exists', 404);

        // Save Ticket Type
        const ticketType = new TicketType({ ...data, event_id: event.id });
        await this.ticketTypesRepo.save(ticketType);
        return ticketType;
    }
}
