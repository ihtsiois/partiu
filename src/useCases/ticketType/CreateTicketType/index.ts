import { PrismaTicketTypesRepository } from '@/repositories/prisma/PrismaTicketTypesRepository';
import { CreateTicketTypeUseCase } from '@/useCases/ticketType/CreateTicketType/CreateTicketTypeUseCase';

const prismaTicketTypeRepo = new PrismaTicketTypesRepository();

const createTicketTypeUseCase = new CreateTicketTypeUseCase(prismaTicketTypeRepo);

const createTicketTypeController = new CreateTicketTypeController(createTicketTypeUseCase);

export { createTicketTypeUseCase, createTicketTypeController };
