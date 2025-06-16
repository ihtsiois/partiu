import { IEventsRepository } from '@/repositories/IEventsRepository';
import { ICategoriesRepository } from '@/repositories/ICategoriesRepository';
import { GetEventResponseDTO } from '@/useCases/store/GetEvent/GetEventDTO';
import { formatAddress, gmapUrl } from '@/utils/generate';
import { AppError } from '@/plugins/errorHandler';

export class GetEventUseCase {
    constructor(
        private eventsRepo: IEventsRepository,
        private categoriesRepo: ICategoriesRepository,
    ) {}

    async execute(slug: string): Promise<GetEventResponseDTO> {
        // Get Event
        const event = await this.eventsRepo.findBySlug(slug);
        if (!event) throw new AppError('event_not_exists', 404);
        console.log(event);
        console.log(typeof event);

        // Get Category
        const category = event.category_id ? await this.categoriesRepo.findByID(event.category_id) : null;

        // Update Service fee
        event.service_fee = event.absorve_fee ? 0 : event.service_fee;

        // Format Event Address
        const address = formatAddress(event);
        event.gmaps_url = event.gmaps_url || gmapUrl(event);

        // Is On Sale
        const is_on_sale = event.isSalesOpen();

        // Return Data
        return { ...event, category, address, is_on_sale };
    }
}
