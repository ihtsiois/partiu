import { User } from '@/entities/User';

export interface IUsersRepository {
    list(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    save(user: User): Promise<void>;
    delete(id: string): Promise<void>;
}
