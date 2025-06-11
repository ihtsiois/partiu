import { genId } from '@/utils/generate';

interface TicketTypeProps {
    event_id: string;
    name: string;
}

export class TicketType {
    public readonly id: string;

    public event_id: string;
    public name: string;

    constructor(props: TicketTypeProps, id: string) {
        this.id = id || genId('tktp');

        this.event_id = props.event_id;
        this.name = props.name;
    }
}
