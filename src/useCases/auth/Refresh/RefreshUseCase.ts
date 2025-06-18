import { AppError } from '@/plugins/errorHandler';
import { IAccessTokenProvider } from '@/providers/TokenProviders/IAccessTokenProvider';
import { IRefreshTokensRepository } from '@/repositories/IRefreshTokensRepository';
import { RefreshInputDTO } from './RefreshDTO';
import { IRefreshTokenProvider } from '@/providers/TokenProviders/IRefreshTokenProvider';
import { RefreshToken } from '@/entities/RefreshToken';

const REFRESHTOKEN_DURATION = 1000 * 60 * 60 * 24 * 30;

export class RefreshUseCase {
    constructor(
        private refreshTokensRepo: IRefreshTokensRepository,
        private refreshTokenProvider: IRefreshTokenProvider,
        private accessTokenProvider: IAccessTokenProvider,
    ) {}

    async execute({ refresh_token, fingerprint }: RefreshInputDTO) {
        // Get Refresh Token
        const refreshToken = await this.refreshTokensRepo.getByToken(refresh_token);
        if (!refreshToken || refreshToken.expires_at <= new Date()) throw new AppError('invalid_refresh_token', 401);

        // Validate Fingerprints
        if (refreshToken.ip_address !== fingerprint.ip_address || refreshToken.user_agent !== fingerprint.user_agent) {
            throw new AppError('invalid_refresh_token', 401);
        }

        // Revoke Older Refresh Token
        await this.refreshTokensRepo.revoke(refreshToken.id);

        // Generate new Refresh Token
        const new_refresh_token = this.refreshTokenProvider.generate();
        const newRefreshToken = new RefreshToken({
            user_id: refreshToken.user_id,
            token: new_refresh_token,
            expires_at: new Date(Date.now() + REFRESHTOKEN_DURATION),
            user_agent: fingerprint.user_agent,
            ip_address: fingerprint.ip_address,
        });
        await this.refreshTokensRepo.create(newRefreshToken);

        // Generate New Access Token
        const access_token = this.accessTokenProvider.generate(newRefreshToken.user_id);

        return { access_token, refresh_token: new_refresh_token };
    }
}
