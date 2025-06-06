import { Category } from '@/entities/Category';
import { ICategoriesRepository } from '@/repositories/ICategoriesRepository';

export class FindCategoryByIDUseCase {
    constructor(private categoriesRepo: ICategoriesRepository) {}

    async execute(id: string): Promise<Category> {
        const category = await this.categoriesRepo.findByID(id);
        if (!category) throw new Error('Category not exists');
        return category;
    }
}
