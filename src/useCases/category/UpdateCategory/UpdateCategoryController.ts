import { FastifyReply, FastifyRequest } from 'fastify';
import { UpdateCategoryUseCase } from './UpdateCategoryUseCase';
import { UpdateCategoryRequestDTO } from '@/useCases/category';

export class UpdateCategoryController {
    constructor(private updateCategoryUseCase: UpdateCategoryUseCase) {}

    handle = async (
        req: FastifyRequest<{ Body: UpdateCategoryRequestDTO; Params: { category_id: string } }>,
        res: FastifyReply,
    ): Promise<void> => {
        const { category_id: id } = req.params;
        const category = await this.updateCategoryUseCase.execute(id, req.body);
        return res.status(200).send(category);
    };
}
