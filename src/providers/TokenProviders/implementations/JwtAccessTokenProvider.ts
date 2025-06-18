import jwt from 'jsonwebtoken';
import { IAccessTokenProvider } from '../IAccessTokenProvider';

export class JwtAccessTokenProvider implements IAccessTokenProvider {
    constructor(
        private secret: string,
        private issuer: string,
        private expiresIn = 900,
    ) {}

    generate(user_id: string): string {
        return jwt.sign({}, this.secret, { expiresIn: this.expiresIn, subject: user_id, issuer: this.issuer });
    }
}
