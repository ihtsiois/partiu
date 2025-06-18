import { genId } from '@/utils/generate';

interface RefreshTokenProps {
    user_id: string;
    token_hash: string;
    user_agent?: string | null;
    ip_address?: string | null;
    expires_at: Date;
}

export class RefreshToken {
    public readonly id: string;

    public readonly user_id: string;
    public readonly token_hash: string;
    public readonly user_agent: string | null;
    public readonly ip_address: string | null;
    public readonly expires_at: Date;

    constructor(data: RefreshTokenProps, id?: string) {
        this.id = id || genId('rfrsh');

        this.user_id = data.user_id;
        this.token_hash = data.token_hash;
        this.user_agent = data.user_agent || null;
        this.ip_address = data.ip_address || null;
        this.expires_at = data.expires_at;
    }
}
