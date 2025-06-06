import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserRequestDTO } from '@/useCases/users';

export class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase) {}

    handle = async (req: FastifyRequest<{ Body: CreateUserRequestDTO }>, res: FastifyReply): Promise<void> => {
        const user = await this.createUserUseCase.execute(req.body);
        return res.status(201).send(user);
    };
}
