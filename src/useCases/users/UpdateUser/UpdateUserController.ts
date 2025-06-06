import { FastifyReply, FastifyRequest } from 'fastify';
import { UpdateUserUseCase } from './UpdateUserUseCase';
import { UpdateUserRequestDTO } from '@/useCases/users';

export class UpdateUserController {
    constructor(private updateUserUseCase: UpdateUserUseCase) {}

    handle = async (
        req: FastifyRequest<{ Body: UpdateUserRequestDTO; Params: { user_id: string } }>,
        res: FastifyReply,
    ) => {
        const { user_id: id } = req.params;
        const user = await this.updateUserUseCase.execute(id, req.body);
        return res.status(200).send(user);
    };
}
