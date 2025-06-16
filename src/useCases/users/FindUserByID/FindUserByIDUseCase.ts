import { User } from '@/entities/User';
import { IUsersRepository } from '@/repositories/IUsersRepository';
import { FindUserByIDDTO } from '@/useCases/users/FindUserByID/FindUserByIDDTO';
import { ICustomersRepository } from '@/repositories/ICustomersRepository';
import { AppError } from '@/plugins/errorHandler';

export class FindUserByIDUseCase {
    constructor(
        private usersRepo: IUsersRepository,
        private customersRepo: ICustomersRepository,
    ) {}

    async execute(id: string): Promise<FindUserByIDDTO> {
        // Get User
        const user = await this.usersRepo.findByID(id);
        if (!user) throw new AppError('user_not_exists', 404);

        // Get Customer
        const customer = await this.customersRepo.findByUserID(user.id);

        return { ...user, customer };
    }
}
