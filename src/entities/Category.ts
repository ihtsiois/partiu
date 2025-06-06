import { genId } from '@/utils/generate';

interface CategoryProps {
    slug: string;
    title: string;
    description: string;
    banner_url?: string | null;
    thumbnail_url?: string | null;
}

export class Category {
    public readonly id: string;

    public slug: string;
    public title: string;
    public description: string;
    public banner_url: string | null;
    public thumbnail_url: string | null;

    constructor(props: CategoryProps, id?: string) {
        this.id = id || genId('cat');

        this.slug = props.slug;
        this.title = props.title;
        this.description = props.description;
        this.banner_url = props.banner_url || null;
        this.thumbnail_url = props.thumbnail_url || null;
    }
}
