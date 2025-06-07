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

    app.setErrorHandler((err) => {
        console.log(err);
        return err;
    });

    // Register Plugins
    app.register(require('@/plugins/swagger'));

    // Register Routes
    app.register(require('@/routes/categories'), { prefix: '/v1/categories' });
    app.register(require('@/routes/events'), { prefix: '/v1/events' });
    app.register(require('@/routes/store'), { prefix: '/v1/store' });
    app.register(require('@/routes/users'), { prefix: '/v1/users' });
    app.register(require('@/routes/files'), { prefix: '/v1/files' });

    return app;
}
