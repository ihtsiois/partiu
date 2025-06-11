import { CreateTicketTypeRequestDTO } from '@/useCases/ticketType/CreateTicketType/CreateTicketTypeDTO';
import { TicketType } from '@/entities/TicketType';
import { ITicketTypeRepository } from '@/repositories/ITicketTypeRepository';

export class CreateTicketTypeUseCase {
    constructor(private ticketTypeRepo: ITicketTypeRepository) {}

    async execute(data: CreateTicketTypeRequestDTO) {
        const ticketType = new TicketType(data);
        await this.ticketTypeRepo.save(ticketType);
        return ticketType;
    }
}
