import { User } from '@/entities/User';
import { IUsersRepository } from '@/repositories/IUsersRepository';
import { isValidCPF } from '@/utils/validate';
import { UpdateUserRequestDTO } from '@/useCases/users';

export class UpdateUserUseCase {
    constructor(private usersRepo: IUsersRepository) {}

    async execute(id: string, data: UpdateUserRequestDTO): Promise<User> {
        // Get User
        const user = await this.usersRepo.findByID(id);
        if (!user) throw new Error('User not exists');
        const newUser = new User({ ...user, ...data }, user.id);

        // Validate Email
        if (newUser.email !== user.email) {
            const emailExists = await this.usersRepo.findByEmail(newUser.email);
            if (emailExists) throw new Error('User Already Exists');
        }

        // Update User
        await this.usersRepo.save(newUser);
        return newUser;
    }
}
