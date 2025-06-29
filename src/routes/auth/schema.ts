import { z } from 'zod';

export const authSubjectResponse = z.object({
    id: z.string(),
    email: z.string(),
    display_name: z.string(),
});
