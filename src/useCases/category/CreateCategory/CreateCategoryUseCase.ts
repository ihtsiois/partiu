import { ICategoriesRepository } from '@/repositories/ICategoriesRepository';
import { Category } from '@/entities/Category';
import { CreateCategoryRequestDTO } from '@/useCases/category';
import { slugfy } from '@/utils/generate';
import { AppError } from '@/plugins/errorHandler';

export class CreateCategoryUseCase {
    constructor(private categoriesRepo: ICategoriesRepository) {}

    async execute(data: CreateCategoryRequestDTO): Promise<Category> {
        // Validate Slug
        if (data.slug) {
            const slugExists = await this.categoriesRepo.findBySlug(data.slug);
            if (slugExists) throw new AppError('slug_exists', 409);
        }

        const category = new Category({ ...data, slug: data.slug || slugfy(data.title) });
        await this.categoriesRepo.save(category);
        return category;
    }
}
