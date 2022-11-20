import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { IProduct } from "../store/products/types";
import { Link } from "react-router-dom";
import Paragraph from "./elements/Paragraph";
import CurrencyConvert from "./kits/CurrencyConvert";

export interface ProductProps extends ComponentProps<"div"> {
    product: IProduct;
    toShop: boolean;
}

const Product: FC<ProductProps> = ({ className = "", product, toShop = false, ...rest }) => {
    if (!product) return null;

    return (
        <div
            {...rest}
            id={product._id}
            className={classNames("flex flex-col px-8 py-16 space-y-16 bg-base", { [className]: className })}
        >
            <Link to={toShop ? `/shop/name/${product.name}` : `/poster/${product._id}`}>
                <div title={product.name} className="w-full overflow-hidden">
                    <img
                        className="w-full max-h-[300px] object-contain overflow-hidden"
                        src={product.image.replace(/\\/, "/")}
                        alt={product.name}
                    />
                </div>
            </Link>
            <div className="flex flex-col space-y-1">
                <Link className="text-2xl break-words text-accent tracking-wider" to={`/poster/${product._id}`}>
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
