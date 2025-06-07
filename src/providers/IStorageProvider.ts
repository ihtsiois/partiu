export const uploadAvailableMimeTypes = ['image/png', 'image/jpeg', 'image/webp'] as const;
export type MimeType = (typeof uploadAvailableMimeTypes)[number];

export type UploadProps = {
    key: string;
    contentType: MimeType;
    file: Buffer;
};

export interface IStorageProvider {
    uploadFile(props: UploadProps): Promise<string>;
}
