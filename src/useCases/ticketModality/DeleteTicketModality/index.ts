import { PrismaTicketModalitiesRepository } from '@/repositories/prisma/PrismaTicketModalitiesRepository';
import { DeleteTickeModalityUseCase } from './DeleteTicketModalityUseCase';
import { DeleteTickeModalityController } from './DeleteTicketModalityController';

const prismaTicketModalitiesRepo = new PrismaTicketModalitiesRepository();

const deleteTicketModalityUseCase = new DeleteTickeModalityUseCase(prismaTicketModalitiesRepo);

const deleteTicketModalityController = new DeleteTickeModalityController(deleteTicketModalityUseCase);

export { deleteTicketModalityUseCase, deleteTicketModalityController };
