import { RefreshToken } from '@/entities/RefreshToken';
import { IRefreshTokensRepository } from '../IRefreshTokensRepository';
import { PrismaClient } from '@/generated/prisma';
import { createHash } from 'crypto';

export class PrismaRefreshTokensRepository implements IRefreshTokensRepository {
    private db: PrismaClient;

    constructor() {
        this.db = new PrismaClient();
    }

    async create(refresh_token: RefreshToken): Promise<void> {
        await this.db.refreshToken.create({
            data: refresh_token,
        });
        return;
    }

    async getByID(id: string): Promise<RefreshToken | null> {
        const refreshToken = await this.db.refreshToken.findUnique({ where: { id } });
        if (!refreshToken) return null;
        else return new RefreshToken(refreshToken, refreshToken.id);
    }

    async getByToken(token: string): Promise<RefreshToken | null> {
        const token_hash = createHash('sha256').update(token).digest('hex');
        const refreshToken = await this.db.refreshToken.findUnique({ where: { token_hash } });
        if (!refreshToken) return null;
        else return new RefreshToken(refreshToken, refreshToken.id);
    }

    async revoke(id: string): Promise<void> {
        await this.db.refreshToken.delete({ where: { id } });
        return;
    }
}
