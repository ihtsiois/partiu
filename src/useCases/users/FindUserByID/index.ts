import { PrismaUsersRepository } from '@/repositories/prisma/PrismaUsersRepository';
import { FindUserByIDUseCase } from './FindUserByIDUseCase';
import { FindUserByIDController } from './FindUserByIDController';
import { PrismaCustomersRepository } from '@/repositories/prisma/PrismaCustomersRepository';

const prismaUsersRepo = new PrismaUsersRepository();
const prismaCustomersRepo = new PrismaCustomersRepository();

const findUserByIDUseCase = new FindUserByIDUseCase(prismaUsersRepo, prismaCustomersRepo);

const findUserByIDController = new FindUserByIDController(findUserByIDUseCase);

export { findUserByIDUseCase, findUserByIDController };
export * from './FindUserByIDDTO';
