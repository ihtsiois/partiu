import { PrismaEventsRepository } from '@/repositories/prisma/PrismaEventsRepository';
import { PrismaCategoriesRepository } from '@/repositories/prisma/PrismaCategoriesRepository';
import { PrismaAssetsRepository } from '@/repositories/prisma/PrismaAssetsRepository';
import { GetEventUseCase } from '@/useCases/store/GetEvent/GetEventUseCase';
import { GetEventController } from '@/useCases/store/GetEvent/GetEventController';
import { AssetsService } from '@/services/AssetsService';
import { S3StorageProvider } from '@/providers/providers/S3StorageProvider';

const prismaEventsRepo = new PrismaEventsRepository();
const prismaCategoriesRepo = new PrismaCategoriesRepository();
const prismaAssetsRepo = new PrismaAssetsRepository();
const s3StorageProvider = new S3StorageProvider();

const assetsService = new AssetsService(prismaAssetsRepo, s3StorageProvider);

const getEventUseCase = new GetEventUseCase(prismaEventsRepo, prismaCategoriesRepo, assetsService);

const getEventController = new GetEventController(getEventUseCase);

export { getEventUseCase, getEventController };
export * from './GetEventDTO';
