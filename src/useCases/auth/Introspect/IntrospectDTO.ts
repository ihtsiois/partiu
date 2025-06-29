import { z } from 'zod';

export const introspectRequestQuerySchema = z.object({
    access_token: z.string(),
});

export type IntrospectRequestQueryDTO = z.infer<typeof introspectRequestQuerySchema>;
