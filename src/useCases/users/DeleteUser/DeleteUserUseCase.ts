import { AppError } from '@/plugins/errorHandler';
import { IUsersRepository } from '@/repositories/IUsersRepository';

export class DeleteUserUseCase {
    constructor(private userRepo: IUsersRepository) {}

    async execute(id: string): Promise<void> {
        // Get user
        const user = await this.userRepo.findByID(id);
        if (!user) throw new AppError('user_not_exists', 404);

        // Delete User
        await this.userRepo.delete(user.id);
        return;
    }
}
