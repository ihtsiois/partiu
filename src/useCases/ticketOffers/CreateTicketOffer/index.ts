import { PrismaTicketOffersRepository } from '@/repositories/prisma/PrismaTicketOffersRepository';
import { PrismaTicketTypesRepository } from '@/repositories/prisma/PrismaTicketTypesRepository';
import { CreateTicketOfferUseCase } from './CreateTicketOfferUseCase';
import { CreateTicketOfferController } from './CreateTicketOfferController';

const prismaTicketTypesRepo = new PrismaTicketTypesRepository();
const prismaTicketOffersRepo = new PrismaTicketOffersRepository();

const createTicketOfferUseCase = new CreateTicketOfferUseCase(prismaTicketTypesRepo, prismaTicketOffersRepo);

const createTicketOfferController = new CreateTicketOfferController(createTicketOfferUseCase);

export { createTicketOfferUseCase, createTicketOfferController };
export * from './CreateTicketOfferDTO';
