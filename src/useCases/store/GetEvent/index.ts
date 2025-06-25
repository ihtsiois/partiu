import { PrismaEventsRepository } from '@/repositories/prisma/PrismaEventsRepository';
import { PrismaCategoriesRepository } from '@/repositories/prisma/PrismaCategoriesRepository';
import { GetEventUseCase } from '@/useCases/store/GetEvent/GetEventUseCase';
import { GetEventController } from '@/useCases/store/GetEvent/GetEventController';
import { PrismaTicketTypesRepository } from '@/repositories/prisma/PrismaTicketTypesRepository';
import { PrismaTicketOffersRepository } from '@/repositories/prisma/PrismaTicketOffersRepository';

const prismaEventsRepo = new PrismaEventsRepository();
const prismaCategoriesRepo = new PrismaCategoriesRepository();
const prismaTicketTypesRepo = new PrismaTicketTypesRepository();
const prismaTicketOffersRepo = new PrismaTicketOffersRepository();

const getEventUseCase = new GetEventUseCase(
    prismaEventsRepo,
    prismaCategoriesRepo,
    prismaTicketTypesRepo,
    prismaTicketOffersRepo,
);

const getEventController = new GetEventController(getEventUseCase);

export { getEventUseCase, getEventController };
export * from './GetEventDTO';
