import { PrismaCategoriesRepository } from '@/repositories/prisma/PrismaCategoriesRepository';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';
import { ListCategoriesController } from './ListCategoriesController';

const prismaCategoriesRepo = new PrismaCategoriesRepository();

const listCategoriesUseCase = new ListCategoriesUseCase(prismaCategoriesRepo);

const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);

export { listCategoriesUseCase, listCategoriesController };
