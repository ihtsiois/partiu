import { JwtAccessTokenProvider } from '@/providers/TokenProviders/implementations/JwtAccessTokenProvider';
import { SecureRefreshTokenProvider } from '@/providers/TokenProviders/implementations/SecureRefreshTokenProvider';
import { PrismaRefreshTokensRepository } from '@/repositories/prisma/PrismaRefreshTokensRepository';
import { PrismaUsersRepository } from '@/repositories/prisma/PrismaUsersRepository';
import { SigninUseCase } from './SigninUseCase';
import { jwt } from 'zod/v4';
import { SigninController } from './SigninController';

const prismaUsersRepo = new PrismaUsersRepository();
const prismaRefreshTokensRepo = new PrismaRefreshTokensRepository();
const secureRefreshTokenProvider = new SecureRefreshTokenProvider();
const jwtAccessTokenProvider = new JwtAccessTokenProvider(process.env.TOKEN_SECRET!);

const signinUseCase = new SigninUseCase(
    prismaUsersRepo,
    prismaRefreshTokensRepo,
    secureRefreshTokenProvider,
    jwtAccessTokenProvider,
);

const signinController = new SigninController(signinUseCase);

export { signinUseCase, signinController };
export * from './SigninDTO';
