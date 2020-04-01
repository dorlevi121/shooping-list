import { Product } from "./product.model";

export type List = {
    date: Date,
    buyer: string,
    price: number | string,
    supermarket: string,
    products: Product []
}