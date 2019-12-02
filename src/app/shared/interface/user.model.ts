import { IProduct } from './product.model';

export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    purchase: Array<IProduct>;
}

