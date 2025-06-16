import { ICategoriesRepository } from '@/repositories/ICategoriesRepository';
import { Category } from '@/entities/Category';
import { UpdateCategoryRequestDTO } from '@/useCases/category';
import { AppError } from '@/plugins/errorHandler';

export class UpdateCategoryUseCase {
    constructor(private categoriesRepo: ICategoriesRepository) {}

    async execute(id: string, data: UpdateCategoryRequestDTO): Promise<Category> {
        // Get Category
        const category = await this.categoriesRepo.findByID(id);
        if (!category) throw new AppError('category_not_found', 404);

        // Validate Slug
        if (data.slug) {
            const slugExists = await this.categoriesRepo.findBySlug(data.slug);
            if (slugExists) throw new AppError('slug_in_use', 409);
        }

        // Update Category
        const newCategory = new Category({ ...category, ...data }, category.id);
        await this.categoriesRepo.save(newCategory);
        return newCategory;
    }
}
