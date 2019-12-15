export interface IProduct {
    id: number;
    category: string;
    name: string;
    description: string;
    price: number;
    image: string;
    rating: Array<number>;
    comments: Array<IComment>;
    quantity:number;
    commentsStatus:boolean;
}

export interface IComment {
    id: number;
    user: string;
    text: string;
    data: string;
}