import { User } from '@/entities/User';
import { IUsersRepository } from '@/repositories/IUsersRepository';
import { isValidCPF } from '@/utils/validate';
import { UpdateUserRequestDTO } from '@/useCases/users';
import { AppError } from '@/plugins/errorHandler';

export class UpdateUserUseCase {
    constructor(private usersRepo: IUsersRepository) {}

    async execute(id: string, data: UpdateUserRequestDTO): Promise<User> {
        // Get User
        const user = await this.usersRepo.findByID(id);
        if (!user) throw new AppError('user_not_exists', 404);
        const newUser = new User({ ...user, ...data }, user.id);

        // Validate Email
        if (newUser.email !== user.email) {
            const emailExists = await this.usersRepo.findByEmail(newUser.email);
            if (emailExists) throw new AppError('email_in_use', 409);
        }

        // Update User
        await this.usersRepo.save(newUser);
        return newUser;
    }
}
