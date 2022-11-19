import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import Paragraph from "../elements/Paragraph";
import CurrencyConvert from "../kits/CurrencyConvert";

import { IProduct } from "../../store/products/types";
import { OrderItem } from "../../store/orders/types";

export interface OrderItemsCardProps extends ComponentProps<"div"> {
    items: IProduct[] | OrderItem[];
}

const OrderItemsCard: FC<OrderItemsCardProps> = ({ className = "", items = [], ...rest }) => {
    return (
        <div
            {...rest}
            className={classNames("flex flex-col space-y-6 p-6 w-full bg-dark-card", {
                [className]: className,
            })}
        >
            <Paragraph className="text-2xl tracking-wider">Order Items</Paragraph>

            <div className="flex flex-col sm:space-y-8 overflow-y-auto scroll-bar max-h-[600px]">
                {items.map((item: IProduct | OrderItem) => (
                    <div
                        className="flex flex-col py-8 pr-8 space-y-4 border-t-2 border-dashed last-of-type:pb-0 sm:py-0 sm:space-y-0 sm:flex-row sm:w-full sm:items-center sm:border-t-0 sm:border-r-2 border-accent/60"
                        key={item._id}
                    >
                        <div className="flex-shrink-0 w-full mr-4 sm:w-32 sm:h-24">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="max-h-[300px] sm:max-w-full sm:max-h-full"
                            />
                        </div>

                        <Link className="w-full" to={`/product/${item["product"] ? item["product"] : item._id}`}>
                            <Paragraph className="text-lg line-clamp-1 text-accent">{item.name}</Paragraph>
                        </Link>

                        <div className="flex w-full space-x-3 sm:justify-end">
                            <Paragraph>1</Paragraph>
                            <Paragraph>x</Paragraph>
                            <Paragraph>
                                <CurrencyConvert amount={item.price} />
                            </Paragraph>
                            <Paragraph>=</Paragraph>
                            <Paragraph>
                                <CurrencyConvert amount={item.price} />
                            </Paragraph>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderItemsCard;
