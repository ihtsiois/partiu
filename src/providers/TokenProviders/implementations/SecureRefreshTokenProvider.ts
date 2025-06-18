import { randomBytes } from 'crypto';
import { IRefreshTokenProvider } from '../IRefreshTokenProvider';

export class SecureRefreshTokenProvider implements IRefreshTokenProvider {
    generate(): string {
        return randomBytes(64).toString('base64url');
    }
}
