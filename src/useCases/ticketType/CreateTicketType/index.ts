import { PrismaTicketTypeRepository } from '@/repositories/prisma/PrismaTicketTypeRepository';
import { CreateTicketTypeUseCase } from '@/useCases/ticketType/CreateTicketType/CreateTicketTypeUseCase';

const prismaTicketTypeRepo = new PrismaTicketTypeRepository();

const createTicketTypeUseCase = new CreateTicketTypeUseCase(prismaTicketTypeRepo);

const createTicketTypeController = new CreateTicketTypeController(createTicketTypeUseCase);

export { createTicketTypeUseCase, createTicketTypeController };
