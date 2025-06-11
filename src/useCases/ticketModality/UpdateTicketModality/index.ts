import { PrismaTicketModalitiesRepository } from '@/repositories/prisma/PrismaTicketModalitiesRepository';
import { UpdateTicketModalityUseCase } from './UpdateTicketModalityUseCase';
import { UpdateTicketModalityController } from './UpdateTicketModalityController';

const prismaTicketModalitiesRepo = new PrismaTicketModalitiesRepository();

const updateTicketModalityUseCae = new UpdateTicketModalityUseCase(prismaTicketModalitiesRepo);

const updateTicketModalityController = new UpdateTicketModalityController(updateTicketModalityUseCae);

export { updateTicketModalityUseCae, updateTicketModalityController };
export * from './UpdateTicketModalityDTO';
