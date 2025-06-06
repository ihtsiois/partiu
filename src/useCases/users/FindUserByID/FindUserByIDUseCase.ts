import { User } from '@/entities/User';
import { IUsersRepository } from '@/repositories/IUsersRepository';
import { FindUserByIDDTO } from '@/useCases/users/FindUserByID/FindUserByIDDTO';
import { ICustomersRepository } from '@/repositories/ICustomersRepository';

export class FindUserByIDUseCase {
    constructor(
        private usersRepo: IUsersRepository,
        private customersRepo: ICustomersRepository,
    ) {}

    async execute(id: string): Promise<FindUserByIDDTO> {
        // Get User
        const user = await this.usersRepo.findByID(id);
        if (!user) throw new Error('User not exists');

        // Get Customer
        const customer = await this.customersRepo.findByUserID(user.id);

        return { ...user, customer };
    }
}
