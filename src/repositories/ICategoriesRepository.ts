import { Category } from '@/entities/Category';

export interface ICategoriesRepository {
    list(): Promise<Category[]>;
    findById(id: string): Promise<Category | null>;
    findBySlug(slug: string): Promise<Category | null>;
    save(category: Category): Promise<void>;
    delete(id: string): Promise<void>;
}
