import { genId } from '@/utils/generate';

interface UserProps {
    email: string;
    display_name: string;
    password_hash: string;
}

export class User {
    public readonly id: string;

    public email: string;
    public display_name: string;
    public password_hash: string;

    constructor(props: UserProps, id?: string) {
        this.id = id || genId('usr');

        this.email = props.email;
        this.display_name = props.display_name;
        this.password_hash = props.password_hash;
    }
}
