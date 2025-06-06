import { FastifyReply, FastifyRequest } from 'fastify';
import { ListUsersUseCase } from './ListUsersUseCase';

export class ListUsersController {
    constructor(private listUsersUseCase: ListUsersUseCase) {}

    handle = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
        const users = await this.listUsersUseCase.execute();
        return res.status(200).send(users);
    };
}
