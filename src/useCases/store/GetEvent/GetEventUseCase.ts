import { IEventsRepository } from '@/repositories/IEventsRepository';
import { ICategoriesRepository } from '@/repositories/ICategoriesRepository';
import { GetEventResponseDTO } from '@/useCases/store/GetEvent/GetEventDTO';
import { formatAddress, gmapUrl } from '@/utils/generate';
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

        // Get Category
        const category = event.category_id ? await this.categoriesRepo.findById(event.category_id) : null;

        // Get Ticket Types
        const ticketTypes = await this.ticketTypesRepo.listByEvent(event.id);
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

        // Update Service fee
        event.service_fee = event.absorve_fee ? 0 : event.service_fee;

        // Format Event Address
        const inline_address = formatAddress(event);
        event.gmaps_url = event.gmaps_url || gmapUrl(event);

        // Is On Sale
        const is_on_sale = event.isSalesOpen();

        // Return Data
        return { ...event, category, ticket_types: sortedTicketTypes, inline_address, is_on_sale };
    }
}
