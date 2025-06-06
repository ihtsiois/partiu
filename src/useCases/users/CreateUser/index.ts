import { PrismaUsersRepository } from '@/repositories/prisma/PrismaUsersRepository';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserController } from './CreateUserController';

const prismaUsersRepo = new PrismaUsersRepository();

const createUserUseCase = new CreateUserUseCase(prismaUsersRepo);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
export * from './CreateUserDTO';
