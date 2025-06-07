import { extension } from 'mime-types';
import { IStorageProvider, MimeType } from '@/providers/IStorageProvider';
import { genId } from '@/utils/generate';
import { UploadFileResponseDTO } from '@/useCases/files/UploadFile/UploadFileDTO';
import { IAssetsRepository } from '@/repositories/IAssetsRepository';
import { Asset } from '@/entities/Asset';

export class UploadFileUseCase {
    constructor(
        private assetsRepo: IAssetsRepository,
        private storageProvider: IStorageProvider,
    ) {}

    async execute(
        name: string,
        contentType: MimeType,
        contentLength: number,
        opts: { public_access: boolean },
    ): Promise<UploadFileResponseDTO> {
        // Generate Upload URL
        const key = `uploads/${opts.public_access ? 'public/' : ''}${contentType}/${Date.now()}${genId()}.${extension(contentType)}`;
        const { upload_url } = await this.storageProvider.getUploadSignedUrl({
            key,
            contentType,
            contentLength,
            expiresIn: 600,
        });

        // Create Asset
        const asset = new Asset({
            owner_id: 'root',
            display_name: name,
            source: 'AMZ_S3',
            resource: key,
            signed_url: !opts.public_access,
            content_type: contentType,
            content_length: contentLength,
        });
        await this.assetsRepo.save(asset);

        return { upload_url, asset_id: asset.id };
    }
}
