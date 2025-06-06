import { FastifyReply, FastifyRequest } from 'fastify';
import { DeleteUserUseCase } from './DeleteUserUseCase';

export class DeleteUserController {
    constructor(private deleteUserUseCase: DeleteUserUseCase) {}

    handle = async (req: FastifyRequest<{ Params: { user_id: string } }>, res: FastifyReply) => {
        const { user_id: id } = req.params;
        await this.deleteUserUseCase.execute(id);
        return res.status(204).send();
    };
}
