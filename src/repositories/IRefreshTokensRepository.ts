import { RefreshToken } from '@/entities/RefreshToken';

export interface IRefreshTokensRepository {
    create(refresh_token: RefreshToken): Promise<void>;
    getByID(id: string): Promise<RefreshToken | null>;
    getByToken(token: string): Promise<RefreshToken | null>;
    revoke(id: string): Promise<void>;
}
