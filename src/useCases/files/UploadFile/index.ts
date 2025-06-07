import { S3StorageProvider } from '@/providers/providers/S3StorageProvider';
import { UploadFileUseCase } from '@/useCases/files/UploadFile/UploadFileUseCase';
import { UploadFileController } from '@/useCases/files/UploadFile/UploadFileController';
import { PrismaAssetsRepository } from '@/repositories/prisma/PrismaAssetsRepository';

const s3StorageProvider = new S3StorageProvider();
const prismaAssetsRepo = new PrismaAssetsRepository();

const uploadFileUseCase = new UploadFileUseCase(prismaAssetsRepo, s3StorageProvider);

const uploadFileController = new UploadFileController(uploadFileUseCase);

export { uploadFileUseCase, uploadFileController };
export * from './UploadFileDTO';
