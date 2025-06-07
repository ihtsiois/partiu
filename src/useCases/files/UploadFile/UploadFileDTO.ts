import { z } from 'zod';
import { uploadAvailableMimeTypes } from '@/providers/IStorageProvider';

export const uploadFileRequestSchema = z.object({
    content_type: z.enum(uploadAvailableMimeTypes),
    content_length: z
        .number()
        .positive()
        .max(1024 * 1024 * 25),
    public_access: z.boolean().default(false),
    name: z.string(),
});

export const uploadFileResponseSchema = z.object({
    upload_url: z.string(),
    asset_id: z.string(),
});

export type UploadFileRequestDTO = z.output<typeof uploadFileRequestSchema>;
export type UploadFileResponseDTO = z.input<typeof uploadFileResponseSchema>;
