import { z } from 'zod';

export const refreshRequestSchema = z.object({
    refresh_token: z.string(),
});

export const refreshResponseSchema = z.object({
    refresh_token: z.string(),
    access_token: z.string(),
});

export type RefreshRequestDTO = z.infer<typeof refreshRequestSchema>;

export type RefreshInputDTO = {
    refresh_token: string;
    fingerprint: {
        user_agent?: string | null;
        ip_address?: string | null;
    };
};
