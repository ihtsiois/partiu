import { PrismaEventsRepository } from '@/repositories/prisma/PrismaEventsRepository';
import { GetFeedUseCase } from './GetFeedUseCase';
import { GetFeedController } from './GetFeedController';

const prismaEventsRepo = new PrismaEventsRepository();

const getFeedUseCase = new GetFeedUseCase(prismaEventsRepo);

const getFeedController = new GetFeedController(getFeedUseCase);

export { getFeedUseCase, getFeedController };
export * from './GetFeedDTO';
