import { FastifyReply, FastifyRequest } from 'fastify';
import { RefreshUseCase } from './RefreshUseCase';
import { RefreshRequestDTO } from './RefreshDTO';

export class RefreshController {
    constructor(private refreshUseCase: RefreshUseCase) {}

    handle = async (req: FastifyRequest<{ Body: RefreshRequestDTO }>, res: FastifyReply) => {
        const { refresh_token: older } = req.body;
        const { access_token, refresh_token } = await this.refreshUseCase.execute({
            refresh_token: older,
            fingerprint: {
                user_agent: req.headers['user-agent'] ?? null,
                ip_address: req.ip ?? null,
            },
        });

        return res.status(200).send({ refresh_token, access_token });
    };
}
