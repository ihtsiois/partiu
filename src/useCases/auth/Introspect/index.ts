import { JwtAccessTokenProvider } from '@/providers/TokenProviders/implementations/JwtAccessTokenProvider';
import { IntrospectUseCase } from './IntrospectUseCase';
import { PrismaUsersRepository } from '@/repositories/prisma/PrismaUsersRepository';
import { IntrospectController } from './IntrospectController';

const jwtAccessTokenProvider = new JwtAccessTokenProvider(process.env.TOKEN_SECRET!, process.env.SRV_BASE_URL!);
const prismaUsersRepo = new PrismaUsersRepository();

const introspectUseCase = new IntrospectUseCase(jwtAccessTokenProvider, prismaUsersRepo);

const introspectController = new IntrospectController(introspectUseCase);

export { introspectUseCase, introspectController };
export * from './IntrospectDTO';
