import { PrismaEventsRepository } from '@/repositories/prisma/PrismaEventsRepository';
import { PrismaCategoriesRepository } from '@/repositories/prisma/PrismaCategoriesRepository';
import { GetEventUseCase } from '@/useCases/store/GetEvent/GetEventUseCase';
import { GetEventController } from '@/useCases/store/GetEvent/GetEventController';
import { S3StorageProvider } from '@/providers/providers/S3StorageProvider';

const prismaEventsRepo = new PrismaEventsRepository();
const prismaCategoriesRepo = new PrismaCategoriesRepository();
const s3StorageProvider = new S3StorageProvider();

const getEventUseCase = new GetEventUseCase(prismaEventsRepo, prismaCategoriesRepo);

const getEventController = new GetEventController(getEventUseCase);

export { getEventUseCase, getEventController };
export * from './GetEventDTO';
