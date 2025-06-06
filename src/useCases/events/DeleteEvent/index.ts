import { PrismaEventsRepository } from '@/repositories/prisma/PrismaEventsRepository';
import { DeleteEventUseCase } from '@/useCases/events/DeleteEvent/DeleteEventUseCase';
import { DeleteEventController } from '@/useCases/events/DeleteEvent/DeleteEventController';

const prismaEventsRepo = new PrismaEventsRepository();

const deleteEventUseCase = new DeleteEventUseCase(prismaEventsRepo);

const deleteEventController = new DeleteEventController(deleteEventUseCase);

export { deleteEventUseCase, deleteEventController };
