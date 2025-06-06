import { FastifyReply, FastifyRequest } from 'fastify';
import { FindUserByIDUseCase } from './FindUserByIDUseCase';

export class FindUserByIDController {
    constructor(private findUserByIDUseCase: FindUserByIDUseCase) {}

    handle = async (req: FastifyRequest<{ Params: { user_id: string } }>, res: FastifyReply) => {
        const { user_id: id } = req.params;
        const user = await this.findUserByIDUseCase.execute(id);
        return res.status(200).send(user);
    };
}
