import { z } from 'zod';

export const updateUserRequestSchema = z.object({
    email: z.string().email().optional(),
    display_name: z.string().min(1, 'Required').optional(),
});

export type UpdateUserRequestDTO = z.infer<typeof updateUserRequestSchema>;
