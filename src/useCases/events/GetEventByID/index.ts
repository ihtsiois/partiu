import { PrismaEventsRepository } from '@/repositories/prisma/PrismaEventsRepository';
import { GetEventByIDController } from '@/useCases/events/GetEventByID/GetEventByIDController';
import { GetEventByIDUseCase } from '@/useCases/events/GetEventByID/GetEventByIDUseCase';

const prismaEventsRepo = new PrismaEventsRepository();

const getEventByIDUseCase = new GetEventByIDUseCase(prismaEventsRepo);

const getEventByIDController = new GetEventByIDController(getEventByIDUseCase);

export { getEventByIDUseCase, getEventByIDController };
