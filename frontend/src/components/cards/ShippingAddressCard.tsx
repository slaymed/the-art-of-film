import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import Paragraph from "../elements/Paragraph";

import { Address, User } from "../../store/auth/types";

export interface ShippingAddressCardProps extends ComponentProps<"div"> {
    userInfo: User;
    shippingAddress: Partial<Address>;
}

const ShippingAddressCard: FC<ShippingAddressCardProps> = ({ className = "", userInfo, shippingAddress, ...rest }) => {
    return (
        <div
            {...rest}
            className={classNames("flex flex-col p-6 space-y-4 bg-dark-card", {
                [className]: className,
            })}
        >
            <Paragraph className="text-2xl tracking-wider">Shipping Info</Paragraph>
            <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                    <Paragraph className="text-sm">Name:</Paragraph>
                    <Paragraph className="text-sm line-clamp-1 text-accent/80">{userInfo.name}</Paragraph>
                </div>
                <div className="flex items-center space-x-2">
                    <Paragraph className="text-sm">Address:</Paragraph>
                    <Paragraph className="text-sm line-clamp-1 text-accent/80">{shippingAddress.address}</Paragraph>
                </div>
                <div className="flex items-center space-x-2">
                    <Paragraph className="text-sm">City:</Paragraph>
                    <Paragraph className="text-sm line-clamp-1 text-accent/80">{shippingAddress.city}</Paragraph>
                </div>
                <div className="flex items-center space-x-2">
                    <Paragraph className="text-sm">Postal Code:</Paragraph>
                    <Paragraph className="text-sm line-clamp-1 text-accent/80">{shippingAddress.postalCode}</Paragraph>
                </div>
                <div className="flex items-center space-x-2">
                    <Paragraph className="text-sm">Country:</Paragraph>
                    <Paragraph className="text-sm line-clamp-1 text-accent/80">{shippingAddress.country}</Paragraph>
                </div>
            </div>
        </div>
    );
};

export default ShippingAddressCard;
