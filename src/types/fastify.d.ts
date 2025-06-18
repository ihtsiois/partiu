import { User } from '@/entities/User';
import {
    FastifyBaseLogger,
    FastifyInstance,
    preHandlerHookHandler,
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerDefault,
} from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

declare module 'fastify' {
    interface FastifyInstance {
        authenticated: preHandlerHookHandler;
    }

    interface FastifyRequest {
        user: User;
    }
}

export type FastifyTypedInstance = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    FastifyBaseLogger,
    ZodTypeProvider
>;
