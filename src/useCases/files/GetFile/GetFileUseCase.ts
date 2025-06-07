import { IAssetsRepository } from '@/repositories/IAssetsRepository';
import { IStorageProvider } from '@/providers/IStorageProvider';

export class GetFileUseCase {
    constructor(
        private assetsRepo: IAssetsRepository,
        private storageProvider: IStorageProvider,
    ) {}

    async execute(id: string): Promise<string> {
        // Get Asset
        const asset = await this.assetsRepo.findByID(id);
        if (!asset) throw new Error('Asset not exists');

        // Get URL
        return await this.storageProvider.getObjectUrl(asset.resource, asset.signed_url);
    }
}
