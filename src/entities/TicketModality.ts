import { genId } from '@/utils/generate';

interface TicketModalityProps {
    event_id: string;
    name: string;
    description?: string | null;
}

export class TicketModality {
    public readonly id: string;

    public event_id: string;
    public name: string;
    public description: string | null;

    constructor(props: TicketModalityProps, id: string) {
        this.id = id || genId('tkmd');

        this.event_id = props.event_id;
        this.name = props.name;
        this.description = props.description || null;
    }
}
