import { IAssetsRepository } from '@/repositories/IAssetsRepository';
import { Asset } from '@/entities/Asset';
import { PrismaClient } from '@/generated/prisma';
import { MimeType } from '@/providers/IStorageProvider';

export class PrismaAssetsRepository implements IAssetsRepository {
    private db: PrismaClient;

    constructor() {
        this.db = new PrismaClient();
    }

    async findByID(id: string): Promise<Asset | null> {
        const asset = await this.db.asset.findUnique({ where: { id } });
        if (!asset) return null;
        else return new Asset({ ...asset, content_type: asset.content_type as MimeType }, asset.id);
    }

    async save(asset: Asset): Promise<void> {
        await this.db.asset.upsert({
            where: { id: asset.id },
            update: asset,
            create: asset,
        });
        return;
    }

    async delete(id: string): Promise<void> {
        await this.db.asset.delete({ where: { id } });
        return;
    }
}
