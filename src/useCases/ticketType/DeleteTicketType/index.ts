import { PrismaTicketTypesRepository } from '@/repositories/prisma/PrismaTicketTypesRepository';
import { DeleteTicketTypeUseCase } from './DeleteTicketTypeUseCase';
import { DeleteTicketTypeController } from './DeleteTicketTypeController';

const prismaTicketTypesRepo = new PrismaTicketTypesRepository();

const deleteTicketTypeUseCase = new DeleteTicketTypeUseCase(prismaTicketTypesRepo);

const deleteTicketTypeController = new DeleteTicketTypeController(deleteTicketTypeUseCase);

export { deleteTicketTypeUseCase, deleteTicketTypeController };
