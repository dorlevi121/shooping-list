import { Ingredient } from "./ingredient.modal";

export type Product = {
    title: string,
    quantity: number,
    check: boolean,
    id: string,
    ingredient: Ingredient,
    note?: string
}