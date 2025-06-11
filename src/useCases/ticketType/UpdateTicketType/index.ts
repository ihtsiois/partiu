import { PrismaTicketTypesRepository } from '@/repositories/prisma/PrismaTicketTypesRepository';
import { UpdateTicketTypeUseCase } from './UpdateTicketTypeUseCase';
import { UpdateTicketTypeController } from './UpdateTicketTypeController';

const prismaTicketTypesRepo = new PrismaTicketTypesRepository();

const updateTicketTypeUseCase = new UpdateTicketTypeUseCase(prismaTicketTypesRepo);

const updateTicketTypeController = new UpdateTicketTypeController(updateTicketTypeUseCase);

export { updateTicketTypeUseCase, updateTicketTypeController };
export * from './UpdateTicketTypeDTO';
