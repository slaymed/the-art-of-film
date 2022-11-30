import React, { FC, ComponentProps, memo } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { IProduct } from "../../store/products/types";

import Paragraph from "../elements/Paragraph";
import CurrencyConvert from "../kits/CurrencyConvert";
import Button from "../elements/Button";

import { useDispatch } from "../../hooks/useDispatch";

import { removeFromCart } from "../../store/cart/thunks";

export interface CartItemCardProps extends ComponentProps<"div"> {
    item: IProduct;
}

const CartItemCard: FC<CartItemCardProps> = ({ className = "", item, ...rest }) => {
    const dispatch = useDispatch();

    const remove = () => dispatch(removeFromCart(item._id));

    if (!item) return null;

    const price = item.salePrice ?? item.price;

    return (
        <div
            {...rest}
            className={classNames("flex items-center justify-between space-x-4", { [className]: className })}
        >
            <Link to={`/poster/${item._id}`}>
                <div className="flex items-center justify-center flex-shrink-0 w-20 h-12 md:w-24 lg:w-28 md:h-16 lg:h-20">
                    <img src={item.image} alt={item.name} className="max-w-full max-h-full" />
                </div>
            </Link>

            <div className="w-full line-clamp-1">
                <Link to={`/poster/${item._id}`}>
                    <Paragraph className="text-sm">{item.name}</Paragraph>
                </Link>
            </div>

            <Paragraph className="text-sm w-[120px]">
                <CurrencyConvert amount={price} />
            </Paragraph>

            <Button type="button" className="px-4 py-2 text-black bg-white" onClick={remove}>
                Delete
            </Button>
        </div>
    );
};

export default memo(CartItemCard);
