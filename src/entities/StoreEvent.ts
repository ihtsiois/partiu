import { Event } from './Event';
import { formatAddress, gmapUrl } from '@/utils/generate';

export interface StoreEventData {
    id: string;
    slug: string;
    title: string;
    type: string;
    service_fee: number;
    is_published: boolean;
    is_private: boolean;
    absorve_fee: boolean;
    description: string | null;
    category_id: string | null;
    banner_url: string | null;
    thumbnail_url: string | null;
    opengraph_url: string | null;
    theme_color: string | null;
    age_rating: string;
    start_date: Date;
    end_date: Date;
    sales_starts_at: Date;
    sales_ends_at: Date;
    address_name: string | null;
    address_zip_code: string | null;
    address_country: string | null;
    address_region: string | null;
    address_city: string | null;
    address_line: string | null;
    gmaps_url: string | null;
    inline_address: string | null;
    gmapUrl: string | null;
}

export class StoreEvent {
    public readonly data: StoreEventData;

    constructor(event: Event) {
        this.data = {
            id: event.id,
            slug: event.slug,
            title: event.title,
            type: event.type,
            service_fee: event.service_fee,
            is_published: event.is_published,
            is_private: event.is_private,
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
            gmaps_url: event.gmaps_url || gmapUrl(event),
            inline_address: formatAddress(event),
            gmapUrl: gmapUrl(event) || event.gmaps_url,
        };
    }

    isSalesOpen(): boolean {
        const now = new Date();
        const isInSalesWindow = now >= this.data.sales_starts_at && now <= this.data.sales_ends_at;
        const isVisible = this.data.is_published && !this.data.is_private;
        return isInSalesWindow && isVisible;
    }

    static fromEvent(event: Event): StoreEvent {
        return new StoreEvent(event);
    }
}
