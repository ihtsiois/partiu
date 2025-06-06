import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateCategoryRequestDTO } from '@/useCases/category';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export class CreateCategoryController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

    handle = async (req: FastifyRequest<{ Body: CreateCategoryRequestDTO }>, res: FastifyReply): Promise<void> => {
        const category = await this.createCategoryUseCase.execute(req.body);
        return res.status(201).send(category);
    };
}
