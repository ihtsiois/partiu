import { PrismaClient } from '@/generated/prisma';
import { User } from '@/entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class PrismaUsersRepository implements IUsersRepository {
    private db: PrismaClient;

    constructor() {
        this.db = new PrismaClient();
    }

    async list(): Promise<User[]> {
        const users = await this.db.user.findMany();
        return users.map((u) => new User(u, u.id));
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.db.user.findUnique({ where: { id } });
        if (!user) return null;
        else return new User(user, user.id);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.db.user.findUnique({ where: { email } });
        if (user) return new User(user, user.id);
        else return null;
    }

    async save(user: User): Promise<void> {
        await this.db.user.upsert({
            where: { id: user.id },
            update: user,
            create: user,
        });
        return;
    }

    async delete(id: string): Promise<void> {
        await this.db.user.delete({ where: { id } });
        return;
    }
}
