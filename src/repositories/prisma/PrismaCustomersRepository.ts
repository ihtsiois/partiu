import { ICustomersRepository } from '@/repositories/ICustomersRepository';
import { Customer } from '@/entities/Customer';
import { PrismaClient } from '@/generated/prisma';

export class PrismaCustomersRepository implements ICustomersRepository {
    private db: PrismaClient;

    constructor() {
        this.db = new PrismaClient();
    }

    async list(): Promise<Customer[]> {
        const customers = await this.db.customer.findMany();
        return customers.map((c) => new Customer(c, c.id));
    }

    async findById(id: string): Promise<Customer | null> {
        const customer = await this.db.customer.findUnique({ where: { id } });
        if (!customer) return null;
        else return new Customer(customer, customer.id);
    }

    async findByEmail(email: string): Promise<Customer | null> {
        const customer = await this.db.customer.findUnique({ where: { email } });
        if (!customer) return null;
        else return new Customer(customer, customer.id);
    }

    async findByUserID(user_id: string): Promise<Customer | null> {
        const customer = await this.db.customer.findFirst({ where: { user_id } });
        if (!customer) return null;
        else return new Customer(customer, customer.id);
    }

    async save(customer: Customer): Promise<void> {
        await this.db.customer.upsert({
            where: { id: customer.id },
            update: customer,
            create: customer,
        });
        return;
    }

    async delete(id: string): Promise<void> {
        await this.db.customer.delete({ where: { id } });
        return;
    }
}
