import { JwtAccessTokenProvider } from '@/providers/TokenProviders/implementations/JwtAccessTokenProvider';
import { SecureRefreshTokenProvider } from '@/providers/TokenProviders/implementations/SecureRefreshTokenProvider';
import { PrismaRefreshTokensRepository } from '@/repositories/prisma/PrismaRefreshTokensRepository';
import { PrismaUsersRepository } from '@/repositories/prisma/PrismaUsersRepository';
import { SigninUseCase } from './SigninUseCase';
import { SigninController } from './SigninController';

const prismaUsersRepo = new PrismaUsersRepository();
const prismaRefreshTokensRepo = new PrismaRefreshTokensRepository();
const secureRefreshTokenProvider = new SecureRefreshTokenProvider();
const jwtAccessTokenProvider = new JwtAccessTokenProvider(process.env.TOKEN_SECRET!, process.env.SRV_BASE_URL!);

const signinUseCase = new SigninUseCase(
    prismaUsersRepo,
    prismaRefreshTokensRepo,
    secureRefreshTokenProvider,
    jwtAccessTokenProvider,
);

const signinController = new SigninController(signinUseCase);

export { signinUseCase, signinController };
export * from './SigninDTO';
