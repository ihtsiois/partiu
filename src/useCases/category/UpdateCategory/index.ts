import { PrismaCategoriesRepository } from '@/repositories/prisma/PrismaCategoriesRepository';
import { UpdateCategoryUseCase } from './UpdateCategoryUseCase';
import { UpdateCategoryController } from './UpdateCategoryController';

const prismaCategoriesRepo = new PrismaCategoriesRepository();

const updateCategoryUseCase = new UpdateCategoryUseCase(prismaCategoriesRepo);

const updateCategoryController = new UpdateCategoryController(updateCategoryUseCase);

export { updateCategoryUseCase, updateCategoryController };
export * from './UpdateCategoryDTO';
