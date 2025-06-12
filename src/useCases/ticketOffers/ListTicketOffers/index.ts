import { PrismaTicketOffersRepository } from '@/repositories/prisma/PrismaTicketOffersRepository';
import { PrismaTicketTypesRepository } from '@/repositories/prisma/PrismaTicketTypesRepository';
import { ListTicketOffersUseCase } from './ListTicketOffersUseCase';
import { ListTicketOffersController } from './ListTicketOffersController';

const prismaTicketTypesRepo = new PrismaTicketTypesRepository();
const prismaTicketOffersRepo = new PrismaTicketOffersRepository();

const listTicketOffersUseCase = new ListTicketOffersUseCase(prismaTicketTypesRepo, prismaTicketOffersRepo);

const listTicketOffersController = new ListTicketOffersController(listTicketOffersUseCase);

export { listTicketOffersUseCase, listTicketOffersController };
