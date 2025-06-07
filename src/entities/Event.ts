import { genId, slugfy } from '@/utils/generate';

export type EventType = 'online' | 'in_person' | 'hybrid';
export type EventAgeRating = 'for_all' | 'min_10' | 'min_12' | 'min_14' | 'min_16' | 'min_18';

interface EventProps {
    slug?: string;
    title: string;
    owner_id: string;
    type: EventType;
    is_published?: boolean;
    is_private?: boolean;
    service_fee?: number;
    absorve_fee?: boolean;
    description?: string | null;
    category_id?: string | null;
    banner_asset_id?: string | null;
    thumbnail_asset_id?: string | null;
    opengraph_asset_id?: string | null;
    age_rating: EventAgeRating;
    start_date: Date;
    end_date: Date;
    sales_starts_at: Date;
    sales_ends_at: Date;
    address_name?: string | null;
    address_zip_code?: string | null;
    address_country?: string | null;
    address_region?: string | null;
    address_city?: string | null;
    address_line?: string | null;
    gmaps_url?: string | null;
    facebook_url?: string | null;
    instagram_url?: string | null;
    twitter_url?: string | null;
    tiktok_url?: string | null;
    site_url?: string | null;
}

export class Event {
    public readonly id: string;

    public slug: string;
    public title: string;
    public owner_id: string;
    public type: EventType;
    public is_published: boolean;
    public is_private: boolean;
    public service_fee: number;
    public absorve_fee: boolean;
    public description: string | null;
    public category_id: string | null;
    public banner_asset_id: string | null;
    public thumbnail_asset_id: string | null;
    public opengraph_asset_id: string | null;
    public age_rating: EventAgeRating;
    public start_date: Date;
    public end_date: Date;
    public sales_starts_at: Date;
    public sales_ends_at: Date;
    public address_name: string | null;
    public address_zip_code: string | null;
    public address_country: string | null;
    public address_region: string | null;
    public address_city: string | null;
    public address_line: string | null;
    public gmaps_url: string | null;
    public facebook_url: string | null;
    public instagram_url: string | null;
    public twitter_url: string | null;
    public tiktok_url: string | null;
    public site_url: string | null;

    constructor(props: EventProps, id?: string) {
        this.id = id || genId('evt');

        this.slug = props.slug || slugfy(props.title, true);
        this.title = props.title;
        this.owner_id = props.owner_id;
        this.type = props.type;
        this.is_published = props.is_published || false;
        this.is_private = props.is_private || false;
        this.service_fee = props.service_fee || 10;
        this.absorve_fee = props.absorve_fee || false;
        this.description = props.description || null;
        this.category_id = props.category_id || null;
        this.banner_asset_id = props.banner_asset_id || null;
        this.thumbnail_asset_id = props.thumbnail_asset_id || null;
        this.opengraph_asset_id = props.opengraph_asset_id || null;
        this.age_rating = props.age_rating;
        this.start_date = props.start_date;
        this.end_date = props.end_date;
        this.sales_starts_at = props.sales_starts_at;
        this.sales_ends_at = props.sales_ends_at;
        this.address_name = props.address_name || null;
        this.address_zip_code = props.address_zip_code || null;
        this.address_country = props.address_country || null;
        this.address_region = props.address_region || null;
        this.address_city = props.address_city || null;
        this.address_line = props.address_line || null;
        this.gmaps_url = props.gmaps_url || null;
        this.facebook_url = props.facebook_url || null;
        this.instagram_url = props.instagram_url || null;
        this.twitter_url = props.twitter_url || null;
        this.tiktok_url = props.tiktok_url || null;
        this.site_url = props.site_url || null;
    }

    public isSalesOpen(): boolean {
        const now = new Date();

        const isInSalesWindow = now >= this.sales_starts_at && now <= this.sales_ends_at;

        const isVisible = this.is_published && !this.is_private;

        return isInSalesWindow && isVisible;
    }
}
