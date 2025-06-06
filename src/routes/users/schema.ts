import { z } from 'zod';
import validator from 'validator';

export const userResponse = z.object({
    id: z.string(),
    email: z.string(),
    display_name: z.string(),
});
