import { Category } from '@/entities/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';
import { PrismaClient } from '@/generated/prisma';

export class PrismaCategoriesRepository implements ICategoriesRepository {
    private db: PrismaClient;

    constructor() {
        this.db = new PrismaClient();
    }

    async list(): Promise<Category[]> {
        const categories = await this.db.category.findMany();
        return categories.map((c) => new Category(c, c.id));
    }

    async findById(id: string): Promise<Category | null> {
        const category = await this.db.category.findUnique({ where: { id } });
        if (!category) return null;
        else return new Category(category, category.id);
    }

    async findBySlug(slug: string): Promise<Category | null> {
        const category = await this.db.category.findUnique({ where: { slug } });
        if (!category) return null;
        else return new Category(category, category.id);
    }

    async save(category: Category): Promise<void> {
        await this.db.category.upsert({
            where: { id: category.id },
            update: category,
            create: category,
        });
        return;
    }

    async delete(id: string): Promise<void> {
        await this.db.category.delete({ where: { id } });
        return;
    }
}
