import { Event } from './Event';
import { formatAddress, gmapUrl } from '@/utils/generate';

export class StoreEvent extends Event {
    public readonly inline_address: string | null;
    public readonly gmapUrl: string | null;

    constructor(event: Event) {
        // Call parent constructor with event properties
        super(
            {
                title: event.title,
                owner_id: event.owner_id,
                type: event.type,
                is_published: event.is_published,
                is_private: event.is_private,
                service_fee: event.service_fee,
                absorve_fee: event.absorve_fee,
                description: event.description,
                category_id: event.category_id,
                banner_url: event.banner_url,
                thumbnail_url: event.thumbnail_url,
                opengraph_url: event.opengraph_url,
                theme_color: event.theme_color,
                age_rating: event.age_rating,
                start_date: event.start_date,
                end_date: event.end_date,
                sales_starts_at: event.sales_starts_at,
                sales_ends_at: event.sales_ends_at,
                address_name: event.address_name,
                address_zip_code: event.address_zip_code,
                address_country: event.address_country,
                address_region: event.address_region,
                address_city: event.address_city,
                address_line: event.address_line,
                gmaps_url: event.gmaps_url,
            },
            event.id,
        );

        // Generate inline_address and gmapUrl
        this.inline_address = formatAddress(this);
        this.gmapUrl = gmapUrl(this) || this.gmaps_url;

        // Update gmaps_url if not provided
        if (!this.gmaps_url) {
            this.gmaps_url = gmapUrl(this);
        }
    }

    static fromEvent(event: Event): StoreEvent {
        return new StoreEvent(event);
    }
}
