import { PrismaEventsRepository } from '@/repositories/prisma/PrismaEventsRepository';
import { PrismaCategoriesRepository } from '@/repositories/prisma/PrismaCategoriesRepository';
import { GetEventUseCase } from '@/useCases/store/GetEvent/GetEventUseCase';
import { GetEventController } from '@/useCases/store/GetEvent/GetEventController';

const prismaEventsRepo = new PrismaEventsRepository();
const prismaCategoriesRepo = new PrismaCategoriesRepository();

const getEventUseCase = new GetEventUseCase(prismaEventsRepo, prismaCategoriesRepo);

const getEventController = new GetEventController(getEventUseCase);

export { getEventUseCase, getEventController };
export * from './GetEventDTO';
