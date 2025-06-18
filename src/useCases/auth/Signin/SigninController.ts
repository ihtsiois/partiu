import { FastifyReply, FastifyRequest } from 'fastify';
import { SigninUseCase } from './SigninUseCase';
import { SigninRequestDTO } from './SigninDTO';

export class SigninController {
    constructor(private signinUseCase: SigninUseCase) {}

    handle = async (req: FastifyRequest<{ Body: SigninRequestDTO }>, res: FastifyReply) => {
        const { email, password } = req.body;
        const tokens = await this.signinUseCase.execute({
            email,
            password,
            fingerprint: {
                user_agent: req.headers['user-agent'] ?? null,
                ip_address: req.ip ?? null,
            },
        });

        return res.status(200).send(tokens);
    };
}
