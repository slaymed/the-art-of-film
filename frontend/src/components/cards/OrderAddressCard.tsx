import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import { IOrder } from "../../store/orders/types";

import OrderInfoPieceCard from "./OrderInfoPieceCard";
import OrderInfoSeperator from "../kits/OrderInfoSeperator";
import { User } from "../../store/auth/types";

export interface OrderAddressCardProps extends ComponentProps<"div"> {
    order: IOrder;
    flexColOnly?: boolean;
    redirect?: boolean;
    user: User;
}

const OrderAddressCard: FC<OrderAddressCardProps> = ({
    className = "",
    order,
    flexColOnly = false,
    redirect,
    user,
    ...rest
}) => {
    return (
        <div
            {...rest}
            className={classNames(
                "border-dashed relative flex-shrink-0 flex-col space-y-6 items-center border-2 text-white/80 flex border-accent/40 p-6",
                { [className]: className, "lg:flex-row lg:space-y-0 lg:space-x-6": !flexColOnly }
            )}
        >
            <OrderInfoPieceCard
                title="Name"
                body={order.user._id === user._id ? "You" : order.user.name}
                flexColOnly={flexColOnly}
            />
            <OrderInfoSeperator flexColOnly={flexColOnly} />

            <OrderInfoPieceCard title="Address" body={order.shippingAddress.address} flexColOnly={flexColOnly} />
            <OrderInfoSeperator flexColOnly={flexColOnly} />

            <OrderInfoPieceCard title="City" body={order.shippingAddress.city as any} flexColOnly={flexColOnly} />
            <OrderInfoSeperator flexColOnly={flexColOnly} />

            <OrderInfoPieceCard
                title="Postal Code"
                body={order.shippingAddress.postalCode as any}
                flexColOnly={flexColOnly}
            />
            <OrderInfoSeperator flexColOnly={flexColOnly} />

            <OrderInfoPieceCard title="Country" body={order.shippingAddress.country as any} flexColOnly={flexColOnly} />

            {!order.isDelivered && (
                <>
                    <OrderInfoSeperator flexColOnly={flexColOnly} />
                    <OrderInfoPieceCard
                        title="Status"
                        body={`Wating for ${
                            order.seller._id === user._id ? "you" : order.seller.name
                        } to send delivery`}
                        flexColOnly={flexColOnly}
                    />
                </>
            )}
        </div>
    );
};

export default OrderAddressCard;
