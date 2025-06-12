import { PrismaTicketOffersRepository } from '@/repositories/prisma/PrismaTicketOffersRepository';
import { GetTicketOfferByIDUseCase } from './GetTicketOfferByIDUseCase';
import { GetTicketOfferByIDController } from './GetTicketOfferByIDController';

const prismaTicketOffersRepo = new PrismaTicketOffersRepository();

const getTicketOfferByIDUseCase = new GetTicketOfferByIDUseCase(prismaTicketOffersRepo);

const getTicketOfferByIDController = new GetTicketOfferByIDController(getTicketOfferByIDUseCase);

export { getTicketOfferByIDUseCase, getTicketOfferByIDController };
