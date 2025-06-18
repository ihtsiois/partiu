import { RefreshToken } from '@/entities/RefreshToken';
import { AppError } from '@/plugins/errorHandler';
import { IAccessTokenProvider } from '@/providers/TokenProviders/IAccessTokenProvider';
import { IRefreshTokenProvider } from '@/providers/TokenProviders/IRefreshTokenProvider';
import { IRefreshTokensRepository } from '@/repositories/IRefreshTokensRepository';
import { IUsersRepository } from '@/repositories/IUsersRepository';
import { compareSync } from 'bcrypt';
import { SigninInputDTO, SigninOutputDTO } from './SigninDTO';

const REFRESHTOKEN_DURATION = 1000 * 60 * 60 * 24 * 30;

export class SigninUseCase {
    constructor(
        private usersRepo: IUsersRepository,
        private refreshTokensRepo: IRefreshTokensRepository,
        private refreshTokenProvider: IRefreshTokenProvider,
        private accessTokenProvider: IAccessTokenProvider,
    ) {}

    async execute({ email, password, fingerprint }: SigninInputDTO): Promise<SigninOutputDTO> {
        // Get User
        const user = await this.usersRepo.findByEmail(email);
        if (!user) throw new AppError('unauthorized', 401);

        // Validate Password
        if (!compareSync(password, user.password_hash)) {
            throw new AppError('unauthorized', 401);
        }

        // Generate Refresh Token
        const refresh_token = this.refreshTokenProvider.generate();
        const refreshToken = new RefreshToken({
            user_id: user.id,
            token: refresh_token,
            expires_at: new Date(Date.now() + REFRESHTOKEN_DURATION),
            ...fingerprint,
        });
        await this.refreshTokensRepo.create(refreshToken);

        // Generate Access Token
        const access_token = this.accessTokenProvider.generate(user.id);

        return {
            refresh_token,
            access_token,
        };
    }
}
