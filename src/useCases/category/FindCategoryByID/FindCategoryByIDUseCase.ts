import { Category } from '@/entities/Category';
import { AppError } from '@/plugins/errorHandler';
import { ICategoriesRepository } from '@/repositories/ICategoriesRepository';

export class FindCategoryByIDUseCase {
    constructor(private categoriesRepo: ICategoriesRepository) {}

    async execute(id: string): Promise<Category> {
        const category = await this.categoriesRepo.findByID(id);
        if (!category) throw new AppError('category_not_found', 404);
        return category;
    }
}
