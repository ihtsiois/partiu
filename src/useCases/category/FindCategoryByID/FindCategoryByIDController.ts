import { FastifyReply, FastifyRequest } from 'fastify';
import { FindCategoryByIDUseCase } from './FindCategoryByIDUseCase';

export class FindCategoryByIDController {
    constructor(private findCategoryByIDUseCase: FindCategoryByIDUseCase) {}

    handle = async (req: FastifyRequest<{ Params: { category_id: string } }>, res: FastifyReply): Promise<void> => {
        const { category_id: id } = req.params;
        const category = await this.findCategoryByIDUseCase.execute(id);
        return res.status(200).send(category);
    };
}
