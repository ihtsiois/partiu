import { PrismaAssetsRepository } from '@/repositories/prisma/PrismaAssetsRepository';
import { S3StorageProvider } from '@/providers/providers/S3StorageProvider';
import { GetFileUseCase } from '@/useCases/files/GetFile/GetFileUseCase';
import { GetFileController } from '@/useCases/files/GetFile/GetFileController';

const prismaAssetsRepo = new PrismaAssetsRepository();
const s3StorageProvider = new S3StorageProvider();

const getFileUseCase = new GetFileUseCase(prismaAssetsRepo, s3StorageProvider);

const getFileController = new GetFileController(getFileUseCase);

export { getFileUseCase, getFileController };
