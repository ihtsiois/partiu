import { PrismaEventsRepository } from '@/repositories/prisma/PrismaEventsRepository';
import { CreateEventUseCase } from '@/useCases/events/CreateEvent/CreateEventUseCase';
import { CreateEventController } from '@/useCases/events/CreateEvent/CreateEventController';

const prismaEventRepo = new PrismaEventsRepository();

const createEventUseCase = new CreateEventUseCase(prismaEventRepo);

const createEventController = new CreateEventController(createEventUseCase);

export { createEventUseCase, createEventController };
export * from './CreateEventDTO';
