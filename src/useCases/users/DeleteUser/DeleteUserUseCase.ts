import { IUsersRepository } from '@/repositories/IUsersRepository';

export class DeleteUserUseCase {
    constructor(private userRepo: IUsersRepository) {}

    async execute(id: string): Promise<void> {
        // Get user
        const user = await this.userRepo.findByID(id);
        if (!user) throw new Error('User not exists');

        // Delete User
        await this.userRepo.delete(user.id);
        return;
    }
}
