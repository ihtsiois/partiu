export const uploadAvailableMimeTypes = ['image/png', 'image/jpeg', 'image/webp'] as const;
export type MimeType = (typeof uploadAvailableMimeTypes)[number];

export type UploadProps = {
    key: string;
    contentType: MimeType;
    contentLength?: number;
    expiresIn?: number;
};

export interface IStorageProvider {
    getObjectUrl(resource: string, signed: boolean): Promise<string>;
    getUploadSignedUrl(props: UploadProps): Promise<{ upload_url: string; asset_url: string }>;
}
