export interface IProduct {
    id: number;
    category: string;
    name: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    comments: Array<IComment>
}

export interface IComment {
    id: number;
    user: string;
    text: string;
    data: string;
}