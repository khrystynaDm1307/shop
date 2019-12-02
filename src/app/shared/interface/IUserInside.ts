import { Product } from '../class/product.class';
import { User } from './user.model';
export interface IUserInside {
    uid:string;
    obj: User;
    purchase: Array<Product>;
}
