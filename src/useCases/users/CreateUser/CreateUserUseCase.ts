import { IUsersRepository } from '@/repositories/IUsersRepository';
import { User } from '@/entities/User';
import { CreateUserRequestDTO } from '@/useCases/users';
import { isValidCPF } from '@/utils/validate';
import { hashSync } from 'bcrypt';

export class CreateUserUseCase {
    constructor(private usersRepo: IUsersRepository) {}

    async execute(data: CreateUserRequestDTO): Promise<User> {
        // Validate Email
        const emailExists = await this.usersRepo.findByEmail(data.email);
        if (emailExists) throw new Error('User Already Exists');

        // Generate Password Hash
        const password_hash = hashSync(data.password, 12);

        const user = new User({ ...data, password_hash });
        await this.usersRepo.save(user);
        return user;
    }
}
