import { Event } from '@/entities/Event';

export interface IEventsRepository {
    list(): Promise<Event[]>;
    findByID(id: string): Promise<Event | null>;
    findBySlug(slug: string): Promise<Event | null>;
    save(event: Event): Promise<void>;
    delete(id: string): Promise<void>;
}