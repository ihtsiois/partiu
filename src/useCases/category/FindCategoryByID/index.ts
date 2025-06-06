import { PrismaCategoriesRepository } from '@/repositories/prisma/PrismaCategoriesRepository';
import { FindCategoryByIDUseCase } from './FindCategoryByIDUseCase';
import { FindCategoryByIDController } from './FindCategoryByIDController';

const prismaCategoriesRepo = new PrismaCategoriesRepository();

const findCategoryByIDUseCase = new FindCategoryByIDUseCase(prismaCategoriesRepo);

const findCategoryByIDController = new FindCategoryByIDController(findCategoryByIDUseCase);

export { findCategoryByIDUseCase, findCategoryByIDController };
