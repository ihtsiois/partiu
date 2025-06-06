import { User } from '@/entities/User';
import { IUsersRepository } from '@/repositories/IUsersRepository';

export class ListUsersUseCase {
    constructor(private usersRepo: IUsersRepository) {}

    async execute(): Promise<User[]> {
        const users = await this.usersRepo.list();
        return users;
    }
}
