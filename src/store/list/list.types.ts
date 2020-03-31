import { Product } from "../../models/system/product.model";

export interface ListState {
    allProducts: Product []
}

export enum ListActionsEnum {
    NEW_PRODUCT = "NEW_PRODUCT",
    PRODUCT_ERROR = "PRODUCT_ERROR",
    CHANGE_PRODUCT = "CHANGE_PRODUCT",
}

export interface ListActionPattern {
    type: ListActionsEnum; //Action Type
}

export interface newProductActionType extends ListActionPattern {
    type: ListActionsEnum.NEW_PRODUCT,
    allProducts: Product []
}

export interface productErrorActionType extends ListActionPattern {
    type: ListActionsEnum.PRODUCT_ERROR,
    err: Error
}

export interface changeProductActionType extends ListActionPattern {
    type: ListActionsEnum.CHANGE_PRODUCT,
    allProducts: Product []
}
