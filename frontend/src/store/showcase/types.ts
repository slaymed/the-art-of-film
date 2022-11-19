import { User } from "../auth/types";
import { IProduct } from "../products/types";
import { GlobalOperation } from "../types";

export type IShowcase = {
    seller: User;
    products: IProduct[];
};

export interface IShowcaseState {
    selectedProduct: IProduct | null;
    selectedShowcase: IShowcase | null;
    fetchingSelectedShowCase: GlobalOperation;
}
