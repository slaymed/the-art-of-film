import { GlobalMessage, GlobalOperation } from "../types";

export type Address = { address: string; city?: string; postalCode?: string; country?: string; code?: string };

export type ShippingCost = {
    [key: string]: number;
    default: number;
};

export type RolledFolded = {
    rolled: number;
    folded: number;
};

export type RolledFoldedShippingCost = {
    [key: string]: RolledFolded;
    default: RolledFolded;
};

export interface User extends Address {
    _id: string;
    name: string;
    email: string;
    availableBalance: number;
    pendingBalance: number;
    sessions: string[];
    sellerName: string;
    logo: string;
    description: string;
    shipping_cost: ShippingCost;
    rolled_folded_shipping_cost: RolledFoldedShippingCost;
    rating: number;
    numReviews: number;
    account_link?: string;
    trialUsed: boolean;
    collectionName: string;
}

export interface SignInVars {
    email: string;
    password: string;
}

export interface RegisterVars extends SignInVars {
    name: string;
    sellerName: string;
}

export interface UpdateUserVars extends Partial<User> {
    password?: string;
    confirm_pasword?: string;
}

export interface SigninErrors extends Partial<SignInVars>, GlobalMessage {}
export interface RegisterErrors extends Partial<RegisterVars>, GlobalMessage {}

export interface IAuthState {
    user: User | null;
    signin: { loading: boolean; errors: SigninErrors };
    register: { loading: boolean; errors: RegisterErrors };
    fetching: GlobalOperation;
    update: GlobalOperation;
    passwordReset: GlobalOperation;
    finishingPasswordReset: GlobalOperation;
    signout: GlobalOperation;
}
