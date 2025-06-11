import { PrismaTicketTypesRepository } from '@/repositories/prisma/PrismaTicketTypesRepository';
import { PrismaEventsRepository } from '@/repositories/prisma/PrismaEventsRepository';
import { CreateTicketTypeUseCase } from './CreateTicketTypeUseCase';
import { CreateTicketTypeController } from './CreateTicketTypeController';

const prismaEventsRepo = new PrismaEventsRepository();
const prismaTicketTypesRepo = new PrismaTicketTypesRepository();

const createTicketTypeUseCase = new CreateTicketTypeUseCase(prismaEventsRepo, prismaTicketTypesRepo);

const createTicketTypeController = new CreateTicketTypeController(createTicketTypeUseCase);

export { createTicketTypeUseCase, createTicketTypeController };
export * from './CreateTicketTypeDTO';
