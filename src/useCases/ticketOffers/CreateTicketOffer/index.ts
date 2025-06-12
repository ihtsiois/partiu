import { PrismaEventsRepository } from '@/repositories/prisma/PrismaEventsRepository';
import { PrismaTicketModalitiesRepository } from '@/repositories/prisma/PrismaTicketModalitiesRepository';
import { PrismaTicketOffersRepository } from '@/repositories/prisma/PrismaTicketOffersRepository';
import { PrismaTicketTypesRepository } from '@/repositories/prisma/PrismaTicketTypesRepository';
import { CreateTicketOfferUseCase } from './CreateTicketOfferUseCase';
import { CreateTicketOfferController } from './CreateTicketOfferController';

const prismaEventsRepo = new PrismaEventsRepository();
const prismaTicketTypesRepo = new PrismaTicketTypesRepository();
const prismaTicketModalitiesRepo = new PrismaTicketModalitiesRepository();
const prismaTicketOffersRepo = new PrismaTicketOffersRepository();

const createTicketOfferUseCase = new CreateTicketOfferUseCase(
    prismaEventsRepo,
    prismaTicketTypesRepo,
    prismaTicketModalitiesRepo,
    prismaTicketOffersRepo,
);

const createTicketOfferController = new CreateTicketOfferController(createTicketOfferUseCase);

export { createTicketOfferUseCase, createTicketOfferController };
export * from './CreateTicketOfferDTO';
