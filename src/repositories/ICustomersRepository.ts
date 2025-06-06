import { Customer } from '@/entities/Customer';

export interface ICustomersRepository {
    list(): Promise<Customer[]>;
    findByID(id: string): Promise<Customer | null>;
    findByEmail(email: string): Promise<Customer | null>;
    findByUserID(user_id: string): Promise<Customer | null>;
    save(user: Customer): Promise<void>;
    delete(id: string): Promise<void>;
}
