import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import Paragraph from "../elements/Paragraph";

export interface MessageBoxProps extends ComponentProps<"div"> {
    variant?: "danger" | "info";
}

const MessageBox: FC<MessageBoxProps> = ({ className = "", variant = "danger", children, ...rest }) => {
    return (
        <Paragraph
            {...rest}
            className={classNames("text-sm line-clamp-3", {
                [className]: className,
                "text-red-600": variant === "danger",
                "text-blue-600": variant === "info",
            })}
        >
            {children}
        </Paragraph>
    );
};

export default MessageBox;
