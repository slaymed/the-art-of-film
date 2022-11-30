import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { IProduct } from "../store/products/types";

import Paragraph from "./elements/Paragraph";
import CurrencyConvert from "./kits/CurrencyConvert";

export interface ProductProps extends ComponentProps<"div"> {
    product: IProduct;
    toShop: boolean;
    maxWidth?: number | null;
}

const Product: FC<ProductProps> = ({ className = "", product, toShop = false, maxWidth = 360, ...rest }) => {
    if (!product) return null;

    return (
        <div
            {...rest}
            id={product._id}
            className={classNames("bg-base border w-full border-slate-700", { [className]: className })}
            style={{ maxWidth: maxWidth as any }}
        >
            <Link to={toShop ? `/shop?name=${product.name}` : `/poster/${product._id}`}>
                <div title={product.name} className="h-[360px]" style={{ backgroundImage: `url(${product.image})` }}>
                    <div className="w-full h-full bg-black/50 backdrop-blur-md">
                        <img className="w-full h-full object-contain" src={product.image} alt={product.name} />
                    </div>
                </div>
            </Link>
            <div className="flex flex-col space-y-1 max-w-full p-8">
                <Link
                    className="text-2xl break-all line-clamp-1 text-accent tracking-wider"
                    to={`/poster/${product._id}`}
                >
                    {product.name}
                </Link>
                <Paragraph className="text-2xl font-bold">
                    <CurrencyConvert amount={product.salePrice || product.price} />
                </Paragraph>
            </div>
        </div>
    );
};

export default Product;
