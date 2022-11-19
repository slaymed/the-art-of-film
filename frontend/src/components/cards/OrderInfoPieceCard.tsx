import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import Paragraph from "../elements/Paragraph";

interface OrderInfoPieceCardProps extends ComponentProps<"div"> {
    title: string;
    body: string | number | JSX.Element;
    bodyColor?: string;
    flexColOnly?: boolean;
}

const OrderInfoPieceCard: FC<OrderInfoPieceCardProps> = ({
    className = "",
    title,
    body,
    onClick,
    bodyColor,
    flexColOnly,
    ...rest
}) => {
    return (
        <div
            {...rest}
            className={classNames("flex justify-between space-x-6 items-center w-full", {
                [className]: className,
                "lg:items-start lg:flex-col lg:space-y-4 lg:space-x-0": !flexColOnly,
            })}
        >
            <Paragraph className="truncate text-md text-accent/80">{title}</Paragraph>
            <Paragraph
                className={classNames("text-sm line-clamp-2 max-w-[250px]", { "cursor-pointer select-none": onClick })}
                style={{ color: bodyColor }}
                onClick={onClick}
            >
                {body}
            </Paragraph>
        </div>
    );
};

export default OrderInfoPieceCard;
