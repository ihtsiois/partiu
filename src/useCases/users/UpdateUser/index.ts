import { PrismaUsersRepository } from '@/repositories/prisma/PrismaUsersRepository';
import { UpdateUserUseCase } from './UpdateUserUseCase';
import { UpdateUserController } from './UpdateUserController';

const prismaUsersRepo = new PrismaUsersRepository();

const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepo);

const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserUseCase, updateUserController };
export * from './UpdateUserDTO';
