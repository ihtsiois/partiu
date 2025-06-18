import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { fastifyCors } from '@fastify/cors';

export function buildApp() {
    // Setup App
    const app = fastify();
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    // Setup Cors
    app.register(fastifyCors, {
        origin: ['*'],
    });

    // Register Plugins
    app.register(require('@/plugins/errorHandler'));
    app.register(require('@/plugins/swagger'));

    // Register Routes
    app.register(require('@/routes/auth'), { prefix: '/v1/auth' });
    app.register(require('@/routes/categories'), { prefix: '/v1/categories' });
    app.register(require('@/routes/events'), { prefix: '/v1/events' });
    app.register(require('@/routes/store'), { prefix: '/v1/store' });
    app.register(require('@/routes/ticketOffers'), { prefix: '/v1/ticket-offers' });
    app.register(require('@/routes/ticketTypes'), { prefix: '/v1/ticket-types' });
    app.register(require('@/routes/users'), { prefix: '/v1/users' });

    return app;
}
