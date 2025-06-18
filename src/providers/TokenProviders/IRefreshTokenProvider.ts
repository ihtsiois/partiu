export type RefreshTokenFingerprint = {
    user_agent?: string | null;
    ip_address?: string | null;
};

export interface IRefreshTokenProvider {
    generate(): string;
}
