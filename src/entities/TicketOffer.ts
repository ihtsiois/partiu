import { genId } from '@/utils/generate';

interface TicketOfferProps {
    ticket_type_id: string;
    modality_id: string;
}

export class TicketOffer {
    public readonly id: string;

    public ticket_type_id: string;
    public modality_id: string;

    constructor(props: TicketOfferProps, id?: string) {
        this.id = id || genId('tkof');

        this.ticket_type_id = props.ticket_type_id;
        this.modality_id = props.modality_id;
    }
}
