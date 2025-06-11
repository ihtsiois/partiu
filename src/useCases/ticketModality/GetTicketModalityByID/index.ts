import { PrismaTicketModalitiesRepository } from '@/repositories/prisma/PrismaTicketModalitiesRepository';
import { GetTicketModalityByIDUseCase } from './GetTicketModalityByIDUseCase';
import { GetTicketModalityByIDController } from './GetTicketModalityByIDController';

const prismaTicketModalitiesRepo = new PrismaTicketModalitiesRepository();

const getTicketModalityByIDUseCase = new GetTicketModalityByIDUseCase(prismaTicketModalitiesRepo);

const getTicketModalityByIDController = new GetTicketModalityByIDController(getTicketModalityByIDUseCase);

export { getTicketModalityByIDUseCase, getTicketModalityByIDController };
