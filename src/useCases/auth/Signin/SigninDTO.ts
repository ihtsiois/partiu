import { z } from 'zod';

export const signinRequestSchema = z.object({
    email: z.string(),
    password: z.string(),
});

export const signinResponseSchema = z.object({
    access_token: z.string(),
    refresh_token: z.string(),
});

export type SigninRequestDTO = z.infer<typeof signinRequestSchema>;

export type SigninInputDTO = {
    email: string;
    password: string;
    fingerprint: {
        user_agent?: string | null;
        ip_address?: string | null;
    };
};

export type SigninOutputDTO = {
    access_token: string;
    refresh_token: string;
};
