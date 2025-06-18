import { JwtAccessTokenProvider } from '@/providers/TokenProviders/implementations/JwtAccessTokenProvider';
import { PrismaRefreshTokensRepository } from '@/repositories/prisma/PrismaRefreshTokensRepository';
import { RefreshUseCase } from './RefreshUseCase';
import { RefreshController } from './RefreshController';
import { SecureRefreshTokenProvider } from '@/providers/TokenProviders/implementations/SecureRefreshTokenProvider';

const prismaRefreshTokensRepo = new PrismaRefreshTokensRepository();
const secureRefreshTokenProvider = new SecureRefreshTokenProvider();
const jwtAccessTokenProvider = new JwtAccessTokenProvider(process.env.TOKEN_SECRET!, process.env.SRV_BASE_URL!);

const refreshUseCase = new RefreshUseCase(prismaRefreshTokensRepo, secureRefreshTokenProvider, jwtAccessTokenProvider);

const refreshController = new RefreshController(refreshUseCase);

export { refreshUseCase, refreshController };
export * from './RefreshDTO';
