import { Asset } from '@/entities/Asset';

export interface IAssetsRepository {
    findByID(id: string): Promise<Asset | null>;
    save(asset: Asset): Promise<void>;
    delete(id: string): Promise<void>;
}
