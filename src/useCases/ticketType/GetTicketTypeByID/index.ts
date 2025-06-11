import { PrismaTicketTypesRepository } from '@/repositories/prisma/PrismaTicketTypesRepository';
import { GetTicketTypeByIDUseCase } from './GetTicketTypeByIDUseCase';
import { GetTicketTypeByIDController } from './GetTicketTypeByIDController';

const prismaTicketTypesRepo = new PrismaTicketTypesRepository();

const getTicketTypeByIDUseCase = new GetTicketTypeByIDUseCase(prismaTicketTypesRepo);

const getTicketTypeByIDController = new GetTicketTypeByIDController(getTicketTypeByIDUseCase);

export { getTicketTypeByIDUseCase, getTicketTypeByIDController };
