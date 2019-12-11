import { IProduct, IComment } from 'src/app/shared/interface/product.model';

export class Product implements IProduct {
    constructor(
        public id: number,
        public category: string,
        public name: string,
        public description: string,
        public price: number,
        public image: string,
        public rating: number,
        public comments: Array<IComment>,
        public quantity:number
    ) { }
}

export class Comment implements IComment {
    constructor(
        public id: number,
        public user: string,
        public text: string,
        public data: string
    ) { }
}
