import { genId } from '@/utils/generate';

export type CustomerDocumentType = 'BR_CPF' | 'PASSPORT';
export type CustomerGender = 'MALE' | 'FEMALE' | 'OTHER' | 'UNDEFINED';

interface CustomerProps {
    user_id?: string | null;
    email: string;
    document_type: CustomerDocumentType;
    document: string;
    nationality: string;
    legal_name: string;
    birth_date: Date;
    gender: CustomerGender;
    phone_number: string;
}

export class Customer {
    public readonly id: string;

    public user_id: string | null;
    public email: string;
    public document_type: CustomerDocumentType;
    public document: string;
    public nationality: string;
    public legal_name: string;
    public birth_date: Date;
    public gender: CustomerGender;
    public phone_number: string;

    constructor(props: CustomerProps, id?: string) {
        this.id = id || genId('cus');

        this.user_id = props.user_id || null;
        this.email = props.email;
        this.document_type = props.document_type;
        this.document = props.document;
        this.nationality = props.nationality;
        this.legal_name = props.legal_name;
        this.birth_date = props.birth_date;
        this.gender = props.gender;
        this.phone_number = props.phone_number;
    }
}
