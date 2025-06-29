import { AppError } from '@/plugins/errorHandler';
import { IAccessTokenProvider } from '@/providers/TokenProviders/IAccessTokenProvider';
import { IUsersRepository } from '@/repositories/IUsersRepository';

export class IntrospectUseCase {
    constructor(
        private accessTokenProvider: IAccessTokenProvider,
        private usersRepo: IUsersRepository,
    ) {}

    async execute(accessToken: string) {
        // Validate Access Token
        const { sub } = this.accessTokenProvider.verify(accessToken);

        // Get User
        const user = await this.usersRepo.findById(sub);
        if (!user) throw new AppError('unauthorized', 401);

        return user;
    }
}
