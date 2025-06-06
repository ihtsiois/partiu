import { PrismaUsersRepository } from '@/repositories/prisma/PrismaUsersRepository';
import { ListUsersUseCase } from './ListUsersUseCase';
import { ListUsersController } from './ListUsersController';

const prismaUsersRepo = new PrismaUsersRepository();

const listUsersUseCase = new ListUsersUseCase(prismaUsersRepo);

const listUsersController = new ListUsersController(listUsersUseCase);

export { listUsersUseCase, listUsersController };
