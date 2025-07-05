import { IEventsRepository } from '@/repositories/IEventsRepository';
import { ICategoriesRepository } from '@/repositories/ICategoriesRepository';
import { GetEventResponseDTO } from '@/useCases/store/GetEvent/GetEventDTO';
import { StoreEvent } from '@/entities/StoreEvent';
import { AppError } from '@/plugins/errorHandler';
import { ITicketTypesRepository } from '@/repositories/ITicketTypesRepository';
import { ITicketOffersRepository } from '@/repositories/ITicketOffersRepository';

export class GetEventUseCase {
    constructor(
        private eventsRepo: IEventsRepository,
        private categoriesRepo: ICategoriesRepository,
        private ticketTypesRepo: ITicketTypesRepository,
        private ticketOffersRepo: ITicketOffersRepository,
    ) {}

    async execute(slug: string): Promise<GetEventResponseDTO> {
        // Get Event
        const event = await this.eventsRepo.findBySlug(slug);
        if (!event) throw new AppError('event_not_exists', 404);

        // Convert to StoreEvent
        const storeEvent = StoreEvent.fromEvent(event);

        // Get Category
        const category = storeEvent.category_id ? await this.categoriesRepo.findById(storeEvent.category_id) : null;

        // Get Ticket Types
        const ticketTypes = await this.ticketTypesRepo.listByEvent(storeEvent.id);
        const ticket_types = await Promise.all(
            ticketTypes.map(async (ticketType) => {
                const ticket_offers = await this.ticketOffersRepo.listByType(ticketType.id);
                const sortedTicketOffers = ticket_offers.sort((a, b) => b.price - a.price);
                return {
                    ...ticketType,
                    offers: sortedTicketOffers,
                };
            }),
        );

        // Sort Ticket Types
        const sortedTicketTypes = ticket_types.sort((a, b) => {
            const maxA = a.offers[0]?.price ?? 0;
            const maxB = b.offers[0]?.price ?? 0;
            return maxA - maxB;
        });

        // Calculate service fee
        const service_fee = storeEvent.absorve_fee ? 0 : storeEvent.service_fee;

        // Is On Sale
        const is_on_sale = storeEvent.isSalesOpen();

        // Return Data
        return {
            ...storeEvent,
            service_fee,
            category,
            ticket_types: sortedTicketTypes,
            is_on_sale,
        };
    }
}
