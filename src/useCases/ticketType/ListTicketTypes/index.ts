import { PrismaTicketTypesRepository } from '@/repositories/prisma/PrismaTicketTypesRepository';
import { PrismaEventsRepository } from '@/repositories/prisma/PrismaEventsRepository';
import { ListTicketTypesUseCase } from '@/useCases/ticketType/ListTicketTypes/ListTicketTypesUseCase';
import { ListTicketTypesController } from '@/useCases/ticketType/ListTicketTypes/ListTicketTypesController';

const eventsRepo = new PrismaEventsRepository();
const ticketTypesRepo = new PrismaTicketTypesRepository();

const listTicketTypesUseCase = new ListTicketTypesUseCase(eventsRepo, ticketTypesRepo);

const listTicketTypesController = new ListTicketTypesController(listTicketTypesUseCase);

export { listTicketTypesUseCase, listTicketTypesController };
