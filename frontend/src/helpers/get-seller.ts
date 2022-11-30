import { IProduct } from "../store/products/types";

export const getPosterSeller = (poster?: IProduct | null): any => {
    if (!poster || typeof poster.seller === "string") return {};
    return poster.seller;
};

export const getPosterSellerId = (poster?: IProduct | null) => {
    if (!poster) return "";
    if (typeof poster.seller === "string") return poster.seller;
    return poster.seller._id;
};
