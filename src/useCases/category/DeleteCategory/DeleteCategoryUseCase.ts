import { AppError } from '@/plugins/errorHandler';
import { ICategoriesRepository } from '@/repositories/ICategoriesRepository';

export class DeleteCategoryUseCase {
    constructor(private categoriesRepo: ICategoriesRepository) {}

    async execute(id: string): Promise<void> {
        // Get Category
        const category = await this.categoriesRepo.findById(id);
        if (!category) throw new AppError('category_not_found', 404);

        // Delete Category
        await this.categoriesRepo.delete(category.id);
        return;
    }
}
