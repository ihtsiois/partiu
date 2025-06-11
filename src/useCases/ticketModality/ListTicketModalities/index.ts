import { PrismaEventsRepository } from '@/repositories/prisma/PrismaEventsRepository';
import { PrismaTicketModalitiesRepository } from '@/repositories/prisma/PrismaTicketModalitiesRepository';
import { ListTicketModalitiesUseCase } from './ListTicketModalitiesUseCase';
import { ListTicketModalitiesController } from './ListTicketModalitiesController';

const prismaEventsRepo = new PrismaEventsRepository();
const prismaTicketModalitiesRepo = new PrismaTicketModalitiesRepository();

const listTicketModalitiesUseCase = new ListTicketModalitiesUseCase(prismaEventsRepo, prismaTicketModalitiesRepo);

const listTicketModalitiesController = new ListTicketModalitiesController(listTicketModalitiesUseCase);

export { listTicketModalitiesUseCase, listTicketModalitiesController };
