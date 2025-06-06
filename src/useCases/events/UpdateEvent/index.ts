import { PrismaEventsRepository } from '@/repositories/prisma/PrismaEventsRepository';
import { UpdateEventUseCase } from '@/useCases/events/UpdateEvent/UpdateEventUseCase';
import { UpdateEventController } from '@/useCases/events/UpdateEvent/UpdateEventController';

const prismaEventsRepo = new PrismaEventsRepository();

const updateEventUseCase = new UpdateEventUseCase(prismaEventsRepo);

const updateEventController = new UpdateEventController(updateEventUseCase);

export { updateEventUseCase, updateEventController };
export * from './UpdateEventDTO';
