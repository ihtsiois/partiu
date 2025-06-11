import { PrismaEventsRepository } from '@/repositories/prisma/PrismaEventsRepository';
import { PrismaTicketModalitiesRepository } from '@/repositories/prisma/PrismaTicketModalitiesRepository';
import { CreateTicketModalityUseCase } from './CreateTicketModalityUseCase';
import { CreateTicketModalityControlller } from './CreateTicketModalityController';

const prismaEventsRepo = new PrismaEventsRepository();
const prismaTicketModalitiesRepo = new PrismaTicketModalitiesRepository();

const createTicketModalityUseCase = new CreateTicketModalityUseCase(prismaEventsRepo, prismaTicketModalitiesRepo);

const createTicketModalityController = new CreateTicketModalityControlller(createTicketModalityUseCase);

export { createTicketModalityUseCase, createTicketModalityController };
export * from './CreateTicketModalityDTO';
