export interface IAccessTokenProvider {
    generate(user_id: string): string;
}
