import { PrismaEventsRepository } from '@/repositories/prisma/PrismaEventsRepository';
import { ListEventsUseCase } from '@/useCases/events/ListEvents/ListEventsUseCase';
import { ListEventsController } from '@/useCases/events/ListEvents/ListEventsController';

const prismaEventsRepo = new PrismaEventsRepository();

const listEventsUseCase = new ListEventsUseCase(prismaEventsRepo);

const listEventsController = new ListEventsController(listEventsUseCase);

export { listEventsUseCase, listEventsController };
