import { GetFileUseCase } from '@/useCases/files/GetFile/GetFileUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';

export class GetFileController {
    constructor(private getFileUseCase: GetFileUseCase) {}

    handle = async (req: FastifyRequest<{ Params: { asset_id: string } }>, res: FastifyReply): Promise<void> => {
        const { asset_id: id } = req.params;
        const url = await this.getFileUseCase.execute(id);
        return res.redirect(url);
    };
}
