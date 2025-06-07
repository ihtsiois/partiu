import { IStorageProvider } from '@/providers/IStorageProvider';
import { IAssetsRepository } from '@/repositories/IAssetsRepository';

export class AssetsService {
    constructor(
        private assetsRepo: IAssetsRepository,
        private storageProvider: IStorageProvider,
    ) {}

    async getObjectURL(id: string | null): Promise<string | null> {
        if (!id) return null;

        // Get Asset
        const asset = await this.assetsRepo.findByID(id);
        if (!asset) return null;

        // Return URL
        return await this.storageProvider.getObjectUrl(asset.resource, asset.signed_url);
    }
}
