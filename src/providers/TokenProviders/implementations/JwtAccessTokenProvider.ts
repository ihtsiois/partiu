import jwt from 'jsonwebtoken';
import { IAccessTokenProvider } from '../IAccessTokenProvider';

export class JwtAccessTokenProvider implements IAccessTokenProvider {
    constructor(
        private secret: string,
        private expiresIn = 900,
    ) {}

    generate(user_id: string): string {
        return jwt.sign(
            {
                sub: user_id,
            },
            this.secret,
            { expiresIn: this.expiresIn },
        );
    }
}
