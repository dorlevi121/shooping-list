import { Product } from "./product.model";

export type List = {
    date: Date | any,
    buyer: string,
    price: number | string,
    supermarket: string,
    products: Product []
}