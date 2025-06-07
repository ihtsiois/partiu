import { MimeType } from '@/providers/IStorageProvider';
import { genId } from '@/utils/generate';

export type AssetSource = 'AMZ_S3' | 'URL';

export interface IAssetProps {
    owner_id: string;
    display_name: string;
    source: AssetSource;
    resource: string;
    signed_url: boolean;
    content_type: MimeType;
    content_length: number;
}

export class Asset {
    public readonly id: string;

    public owner_id: string;
    public display_name: string;
    public source: AssetSource;
    public resource: string;
    public signed_url: boolean;
    public content_type: MimeType;
    public content_length: number;

    constructor(props: IAssetProps, id?: string) {
        this.id = id || genId('asst');
        this.owner_id = props.owner_id;
        this.display_name = props.display_name;
        this.source = props.source;
        this.resource = props.resource;
        this.signed_url = props.signed_url;
        this.content_type = props.content_type;
        this.content_length = props.content_length;
    }
}
