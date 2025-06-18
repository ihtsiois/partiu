import { genId } from '@/utils/generate';
import { createHash } from 'crypto';

type BaseProps = {
    user_id: string;
    user_agent?: string | null;
    ip_address?: string | null;
    expires_at: Date;
};

type WithToken = BaseProps & { token: string; token_hash?: never };
type WithTokenHash = BaseProps & { token?: never; token_hash: string };

export type RefreshTokenProps = WithToken | WithTokenHash;

export class RefreshToken {
    public readonly id: string;

    public readonly user_id: string;
    public readonly token_hash: string;
    public readonly user_agent: string | null;
    public readonly ip_address: string | null;
    public readonly expires_at: Date;

    private hash(token: string) {
        return createHash('sha256').update(token).digest('hex');
    }

    constructor(data: RefreshTokenProps, id?: string) {
        this.id = id || genId('rfrsh');

        this.user_id = data.user_id;
        this.token_hash = 'token' in data ? this.hash(data.token!) : data.token_hash!;
        this.user_agent = data.user_agent || null;
        this.ip_address = data.ip_address || null;
        this.expires_at = data.expires_at;
    }
}
