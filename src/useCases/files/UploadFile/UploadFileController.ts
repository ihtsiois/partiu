import { FastifyReply, FastifyRequest } from 'fastify';
import { UploadFileUseCase } from '@/useCases/files/UploadFile/UploadFileUseCase';
import { UploadFileRequestDTO } from '@/useCases/files/UploadFile';

export class UploadFileController {
    constructor(private uploadFileUseCase: UploadFileUseCase) {}

    handle = async (req: FastifyRequest<{ Body: UploadFileRequestDTO }>, res: FastifyReply): Promise<void> => {
        const { content_type, content_length, public_access, name } = req.body;
        const urls = await this.uploadFileUseCase.execute(name, content_type, content_length, { public_access });
        return res.status(200).send(urls);
    };
}
