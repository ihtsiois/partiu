import { z } from 'zod';

export const customerResponse = z.object({
    email: z.string(),
    document_type: z.string(),
    document: z.string(),
    nationality: z.string(),
    legal_name: z.string(),
    birth_date: z.date().transform((d) => d.toISOString().split('T')[0]),
    gender: z.string(),
    phone_number: z.string(),
});

export const findUserByIDResponseSchema = z.object({
    id: z.string(),
    email: z.string(),
    display_name: z.string(),
    customer: customerResponse.nullable(),
});

export type FindUserByIDDTO = z.input<typeof findUserByIDResponseSchema>;
