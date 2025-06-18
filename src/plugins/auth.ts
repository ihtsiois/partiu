import fp from 'fastify-plugin';
import { IAccessTokenProvider } from '@/providers/TokenProviders/IAccessTokenProvider';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AppError } from './errorHandler';
import { IUsersRepository } from '@/repositories/IUsersRepository';
import { FastifyTypedInstance } from '@/types/fastify';
import { JwtAccessTokenProvider } from '@/providers/TokenProviders/implementations/JwtAccessTokenProvider';
import { PrismaUsersRepository } from '@/repositories/prisma/PrismaUsersRepository';

export function makeEnsureAuthenticated(accessTokenProvider: IAccessTokenProvider, usersRepo: IUsersRepository) {
    return async function ensureAuthenticated(req: FastifyRequest, res: FastifyReply) {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError('unauthorized', 401);
        }

        const token = authHeader.split(' ')[1];
        let payload: { sub: string };

        try {
            payload = accessTokenProvider.verify(token);
        } catch (err) {
            throw new AppError('unauthorized', 401);
        }

        const user = await usersRepo.findById(payload.sub);
        if (!user) throw new AppError('unauthorized', 401);

        req.user = user;
    };
}

export default fp((app: FastifyTypedInstance) => {
    const jwtAccessTokenProvider = new JwtAccessTokenProvider(process.env.TOKEN_SECRET!, process.env.SRV_BASE_URL!);
    const prismaUsersRepo = new PrismaUsersRepository();

    const ensureAuthenticated = makeEnsureAuthenticated(jwtAccessTokenProvider, prismaUsersRepo);
    app.decorate('authenticated', ensureAuthenticated);
});
