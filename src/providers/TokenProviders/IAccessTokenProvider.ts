export interface IAccessTokenProvider {
    generate(user_id: string): string;
    verify(access_token: string): { sub: string };
}
