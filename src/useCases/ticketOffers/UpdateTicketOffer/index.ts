import { PrismaTicketOffersRepository } from '@/repositories/prisma/PrismaTicketOffersRepository';
import { UpdateTicketOfferUseCase } from './UpdateTicketOfferUseCase';
import { UpdateTicketOfferController } from './UpdateTIcketOfferController';

const prismaTicketOffersRepo = new PrismaTicketOffersRepository();

const updateTicketOfferUseCase = new UpdateTicketOfferUseCase(prismaTicketOffersRepo);

const updateTicketOfferController = new UpdateTicketOfferController(updateTicketOfferUseCase);

export { updateTicketOfferUseCase, updateTicketOfferController };
export * from './UpdateTicketOfferDTO';
