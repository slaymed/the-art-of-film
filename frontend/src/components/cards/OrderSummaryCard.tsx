import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import { GlobalMessage } from "../../store/types";

import TextHeader from "../elements/TextHeader";
import Button from "../elements/Button";

import LoadingBox from "../kits/LoadingBox";
import Paragraph from "../elements/Paragraph";
import CurrencyConvert from "../kits/CurrencyConvert";
import ErrorWithRedirect from "../kits/ErrorWithRedirect";

export interface OrderSummaryCardProps extends ComponentProps<"div"> {
    totalPrice: number;
    itemsPrice: number;
    shippingCost: number;
    length: number;
    onClick: () => any;
    buttonText: string;
    loading: boolean;
    errors: GlobalMessage;
}

const OrderSummaryCard: FC<OrderSummaryCardProps> = ({
    className = "",
    totalPrice,
    itemsPrice,
    shippingCost,
    length,
    onClick,
    buttonText,
    loading,
    errors,
    ...rest
}) => {
    return (
        <div
            {...rest}
            className={classNames("flex flex-col h-full space-y-8 justify-between bg-dark-card p-8", {
                [className]: className,
            })}
        >
            <Paragraph className="text-2xl tracking-wider">Order Summary</Paragraph>

            <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2 justify-between">
                    <Paragraph>Items</Paragraph>
                    <Paragraph>
                        <CurrencyConvert amount={itemsPrice} />
                    </Paragraph>
                </div>

                <div className="flex items-center space-x-2 justify-between">
                    <Paragraph>Shipping</Paragraph>

                    <Paragraph>
                        <CurrencyConvert amount={shippingCost} />
                    </Paragraph>
                </div>

                <div className="flex items-center space-x-2 justify-between">
                    <TextHeader className="text-2xl tracking-wider">Order Total</TextHeader>

                    <TextHeader className="text-2xl tracking-wider">
                        <CurrencyConvert amount={totalPrice} />
                    </TextHeader>
                </div>

                <Button
                    type="button"
                    onClick={onClick}
                    className={classNames("p-3 text-black bg-accent", {
                        "!bg-white/70": length === 0,
                    })}
                    disabled={length === 0 || loading}
                >
                    {buttonText}
                </Button>

                {loading && <LoadingBox />}
                <ErrorWithRedirect errors={errors} loading={loading} />
            </div>
        </div>
    );
};

export default OrderSummaryCard;
