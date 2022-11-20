import { User } from "../auth/types";
import { ITag } from "../tags/types";
import { GlobalOperation, TimeStamp } from "../types";

export type RolledORFolded = "Rolled" | "Folded";

export interface IProduct extends TimeStamp {
    _id: string;
    name: string;
    seller: User;
    image: string;
    images: string[];
    directors: ITag[];
    casts: ITag[];
    artists: ITag[];
    origin: string;
    year: number;
    format: string;
    condition: string;
    rolledFolded: RolledORFolded;
    countInStock: number;
    price: number;
    marketValue: number;
    salePrice: number;
    description: string;
    visible: boolean;
    forSale: boolean;
    sold: boolean;
    reviews: any[];
}

export type CreateEditPosterVars = {
    name: string;
    image: string;
    images: string[];
    directors: string[];
    casts: string[];
    artists: string[];
    origin: string;
    year: number;
    format: string;
    condition: string;
    rolledFolded?: RolledORFolded;
    price: string;
    salePrice: string;
    description: string;
    marketValue: number;
    forSale: boolean;
    visible: boolean;
    productId?: string;
};

export interface IProductsState {
    fetchingHomeProducts: GlobalOperation;
    selectedProduct: IProduct | null;
    fetchingSelectedProduct: GlobalOperation;
    homelist: IProduct[];
    myProducts: IProduct[];
    create: GlobalOperation;
    update: GlobalOperation;
    remove: GlobalOperation;
    fetchingMyProducts: GlobalOperation;
}
