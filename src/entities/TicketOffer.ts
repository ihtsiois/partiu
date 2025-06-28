import { genId } from '@/utils/generate';

interface TicketOfferProps {
    ticket_type_id: string;
    title: string;
    description?: string | null;
    price: number;
    quantity: number;
}

export class TicketOffer {
    public readonly id: string;

    public ticket_type_id: string;
    public title: string;
    public description: string | null;
    public price: number;
    public quantity: number;

    constructor(props: TicketOfferProps, id?: string) {
        this.id = id || genId('tkof');

        this.ticket_type_id = props.ticket_type_id;
        this.title = props.title;
        this.description = props.description || null;
        this.price = props.price;
        this.quantity = props.quantity;
    }
}
