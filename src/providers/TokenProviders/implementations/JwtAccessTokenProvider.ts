import jwt from 'jsonwebtoken';
import { IAccessTokenProvider } from '../IAccessTokenProvider';
import { AppError } from '@/plugins/errorHandler';

export class JwtAccessTokenProvider implements IAccessTokenProvider {
    constructor(
        private secret: string,
        private issuer: string,
        private expiresIn = 900,
    ) {}

    generate(user_id: string): string {
        return jwt.sign({}, this.secret, { expiresIn: this.expiresIn, subject: user_id, issuer: this.issuer });
    }

    verify(access_token: string): { sub: string } {
        try {
            return jwt.verify(access_token, this.secret) as { sub: string };
        } catch (err) {
            throw new AppError('unauthorized', 401);
        }
    }
}
