import { ICategoriesRepository } from '@/repositories/ICategoriesRepository';

export class DeleteCategoryUseCase {
    constructor(private categoriesRepo: ICategoriesRepository) {}

    async execute(id: string): Promise<void> {
        // Get Category
        const category = await this.categoriesRepo.findByID(id);
        if (!category) throw new Error('Category not exists');

        // Delete Category
        await this.categoriesRepo.delete(category.id);
        return;
    }
}
