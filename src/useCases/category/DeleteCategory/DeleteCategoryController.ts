import { FastifyReply, FastifyRequest } from 'fastify';
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

export class DeleteCategoryController {
    constructor(private deleteCategoryUseCase: DeleteCategoryUseCase) {}

    handle = async (req: FastifyRequest<{ Params: { category_id: string } }>, res: FastifyReply): Promise<void> => {
        const { category_id: id } = req.params;
        await this.deleteCategoryUseCase.execute(id);
        return res.status(204).send();
    };
}
