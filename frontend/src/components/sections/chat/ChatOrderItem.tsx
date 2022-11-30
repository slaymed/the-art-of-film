import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import Paragraph from "../../elements/Paragraph";

import { OrderItem } from "../../../store/orders/types";
import CurrencyConvert from "../../kits/CurrencyConvert";
import { Link } from "react-router-dom";

export interface ChatOrderItemProps extends ComponentProps<"div"> {
    item: OrderItem;
}

const ChatOrderItem: FC<ChatOrderItemProps> = ({ className = "", item, ...rest }) => {
    return (
        <Link to={`/poster/${item.product}`}>
            <div
                {...rest}
                className={classNames("flex flex-col flex-shrink-0 space-y-4 max-w-[240px]", {
                    [className]: className,
                })}
            >
                <div className="border-dashed flex-shrink-0 flex justify-center max-w-full items-center border-2 w-fit border-accent/60 h-[180px] p-1">
                    <img
                        key={item._id}
                        src={item.image}
                        className="max-w-full flex-shrink-0 max-h-full"
                        alt="Poster Banner"
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <Paragraph className="text-accent/60 text-sm line-clamp-2">{item.name}</Paragraph>

                    <Paragraph className="text-accent/80 text-sm line-clamp-1">
                        <CurrencyConvert amount={item.price} />
                    </Paragraph>
                </div>
            </div>
        </Link>
    );
};

export default ChatOrderItem;
