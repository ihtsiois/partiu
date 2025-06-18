import { RefreshToken } from '@/entities/RefreshToken';

export interface IRefreshTokenRepository {
    create(refresh_token: RefreshToken): Promise<void>;
    getByID(id: string): Promise<RefreshToken | null>;
    getByHash(token_hash: string): Promise<RefreshToken | null>;
    revoke(id: string): Promise<void>;
}
