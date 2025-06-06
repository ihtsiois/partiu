import { PrismaCategoriesRepository } from '@/repositories/prisma/PrismaCategoriesRepository';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';
import { CreateCategoryController } from './CreateCategoryController';

const prismaCategoriesRepo = new PrismaCategoriesRepository();

const createCategoryUseCase = new CreateCategoryUseCase(prismaCategoriesRepo);

const createCategoryController = new CreateCategoryController(createCategoryUseCase);

export { createCategoryUseCase, createCategoryController };
export * from './CreateCategoryDTO';
