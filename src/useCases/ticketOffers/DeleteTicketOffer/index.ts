import { PrismaTicketOffersRepository } from '@/repositories/prisma/PrismaTicketOffersRepository';
import { DeleteTicketOfferUseCase } from './DeleteTicketOfferUseCase';
import { DeleteTicketOfferController } from './DeleteTicketOfferController';

const prismaTicketOffersRepo = new PrismaTicketOffersRepository();

const deleteTicketOfferUseCase = new DeleteTicketOfferUseCase(prismaTicketOffersRepo);

const deleteTicketOfferController = new DeleteTicketOfferController(deleteTicketOfferUseCase);

export { deleteTicketOfferUseCase, deleteTicketOfferController };
