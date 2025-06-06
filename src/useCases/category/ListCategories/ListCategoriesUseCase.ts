import { Category } from '@/entities/Category';
import { ICategoriesRepository } from '@/repositories/ICategoriesRepository';

export class ListCategoriesUseCase {
    constructor(private categoriesRepo: ICategoriesRepository) {}

    async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepo.list();
        return categories.map((c) => new Category(c, c.id));
    }
}
