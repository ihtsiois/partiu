import { FastifyReply, FastifyRequest } from 'fastify';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

export class ListCategoriesController {
    constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

    handle = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
        const categories = await this.listCategoriesUseCase.execute();
        return res.status(200).send(categories);
    };
}
