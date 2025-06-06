import { PrismaCategoriesRepository } from '@/repositories/prisma/PrismaCategoriesRepository';
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';
import { DeleteCategoryController } from './DeleteCategoryController';

const prismaCategoriesRepo = new PrismaCategoriesRepository();

const deleteCategoryUseCase = new DeleteCategoryUseCase(prismaCategoriesRepo);

const deleteCategoryController = new DeleteCategoryController(deleteCategoryUseCase);

export { deleteCategoryUseCase, deleteCategoryController };
