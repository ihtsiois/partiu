import { CreateTicketTypeRequestDTO } from '@/useCases/ticketType/CreateTicketType/CreateTicketTypeDTO';
import { TicketType } from '@/entities/TicketType';
import { ITicketTypesRepository } from '@/repositories/ITicketTypesRepository';

export class CreateTicketTypeUseCase {
    constructor(private ticketTypeRepo: ITicketTypesRepository) {}

    async execute(data: CreateTicketTypeRequestDTO) {
        const ticketType = new TicketType(data);
        await this.ticketTypeRepo.save(ticketType);
        return ticketType;
    }
}
