import { z } from 'zod';

export const createUserRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Required'),
    display_name: z.string().min(1, 'Required'),
});

export type CreateUserRequestDTO = z.infer<typeof createUserRequestSchema>;
