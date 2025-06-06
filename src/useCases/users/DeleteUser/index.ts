import { PrismaUsersRepository } from '@/repositories/prisma/PrismaUsersRepository';
import { DeleteUserUseCase } from './DeleteUserUseCase';
import { DeleteUserController } from './DeleteUserController';

const prismaUsersRepo = new PrismaUsersRepository();

const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepo);

const deleteUserController = new DeleteUserController(deleteUserUseCase);

export { deleteUserUseCase, deleteUserController };
